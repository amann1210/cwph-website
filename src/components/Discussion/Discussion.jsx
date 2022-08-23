import React, { useEffect, useState } from 'react'
import "./Discussion.css"
import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { isDOMComponent } from 'react-dom/test-utils';


let Discussion = ({isAuth}) => {
    
    const commentCollectionRef = collection(db, "Comments")
    const replyCollectionRef = collection(db, "Replys");

    let [discussions, setDiscussions] = useState(null)
    let [comment, setComment] = useState("");
    let [reply, setReply] = useState("");




    let [isReplying, setIsReplying] = useState(null);
    // isReply => either null or id of the comment

    let [isViewingReply , setIsViewingReply] = useState(null);
    //  isViewingReply => either null or id of the comment

    let [replies, setReplies] = useState([]);
    // 


    const getComments = async () => {

        let data = await getDocs(commentCollectionRef);
        data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setDiscussions(data);


    };


    const getReplies = async (commentId) => {
        let replys = await getDocs(replyCollectionRef);
        replys = replys.docs.map((reply) => ({...reply.data() , id: reply.id}) )
        replys = replys.filter((reply) => {
            return reply.pid == commentId
        })
        // console.log(replys);
        return replys;

    }






    useEffect(() => {
        getComments();
    }, []);


    let createdAt = new Date(comment.createdAt).toLocaleDateString();
    const postcomment = async () => {

        await addDoc(commentCollectionRef,
            {
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid , profilePic: auth.currentUser.photoURL },
                comment,
                createdAt: (new Date()).toString().substring(0,21),
                pid: null
            });

        setComment("")
        getComments();
    };

    let handleOnChange = (e) => {
        setComment(e.target.value);
    }

    let postReplyHandler = async (pid) => {
        setIsReplying(null);
        await addDoc(replyCollectionRef,
            {
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid , profilePic: auth.currentUser.photoURL },
                reply,
                createdAt: (new Date()).toString().substring(0,21),
                pid: pid
            });
        setReply("");
    }

    let viewReplyHandler = async (pid) => {
        setIsViewingReply(pid);
        if(pid == null){
            return ;
        }
        let replys = await getReplies(pid);
        // console.log(replys[0])

        setReplies(replys);
        return replys;
    }


    let loadCommentUI = (discussion) => {

        if(isViewingReply == null && isReplying == null){
            return ( <div key={discussion.id}>
                       <div className='comment-name-continaer'><img src={discussion.author.profilePic} />{discussion.author.name}<div className='time'><span>{discussion.createdAt}</span></div></div>
                        <div className='comment-comment-container'>{discussion.comment} <br/>
                        <div className='but-div'>
                        <button onClick={() => {
                                setIsReplying(discussion.id);
                        }} className='comment-button'>Reply</button>
                        <button onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                        </div>
                        </div>
            </div>
            )
        }

        else if(isViewingReply == null && isReplying != null){

            return ( <div key={discussion.id}>
                <div className='comment-name-continaer' ><img src={discussion.author.profilePic} />{discussion.author.name}<div className='time'><span>{discussion.createdAt}</span></div></div>
                <div className='comment-comment-container'>{discussion.comment} </div>

                {
                    isReplying == discussion.id ?   <div>
                        <div className='post2'>
                    <textarea className='area' value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' /><br/>
                    <button className='post' onClick={() => postReplyHandler(discussion.id)}>Post Reply</button><br/><br/>
                    </div>
                    </div> : null
                }
                <div className='but-div'>
                 {  
                    isReplying == discussion.id ?  <button onClick={() => {
                        setIsReplying(null);
                }} className='comment-button'>Close Reply</button> : <button onClick={() => {
                    setIsReplying(discussion.id);
            }} className='comment-button'>Reply</button>

                 }
                 
                 <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                 </div>
            </div>
            )
        }

        else if(isViewingReply !=null && isReplying == null){
            return ( <div key={discussion.id}>
                <div className='comment-name-continaer'><img src={discussion.author.profilePic} />{discussion.author.name}<div className='time'><span>{discussion.createdAt}</span></div></div>
                <div className='comment-comment-container'>{discussion.comment} </div>

                
                <div>   
                    {
                        isViewingReply == discussion.id ? <div>
                            {
                            replies.map((reply) => {
                                return <div key={reply.id}>
                                    <div className='reply'>
                                    <div className='comment-name-continaer-reply'><img src={reply.author.profilePic} />{reply.author.name}
                                    <div className='time'>{reply.createdAt}</div></div>
                                    <div className='comment-comment-container'>{reply.reply} </div>
                                    </div>
                                </div>
                            })
                            }

                        </div> : null
                    }


                </div >
                <div className='but-div'>

                
                 <button onClick={() => {
                         setIsReplying(discussion.id);
                 }} className='comment-button'>Reply</button>
                
                 {
                    isViewingReply == discussion.id  ?  <button onClick={() => viewReplyHandler(null)}>Close View</button>  : 
                    <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                 }
                 </div>
            </div>
            )
        }

        else {

            return ( <div key={discussion.id}>
                <div className='comment-name-continaer'><img src={discussion.author.profilePic} />{discussion.author.name}<div className='time'><span>{discussion.createdAt}</span></div></div>
                <div className='comment-comment-container'>{discussion.comment} </div>

                {
                    isReplying == discussion.id ?   <div className='post2'>
                    <textarea className='area' value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' /><br/>
                    <button className='post' onClick={() => postReplyHandler(discussion.id)}>Post Reply</button><br/><br/>
                    </div> : null
                }

                <div>   
                    {
                        isViewingReply == discussion.id ? <div>
                            {
                            replies.map((reply) => {
                                return <div key={reply.id}>
                                    <div className='reply'>
                                    <div className='comment-name-continaer'><img src={reply.author.profilePic} />{reply.author.name}<div className='time'><span>{reply.createdAt}</span></div></div>
                                    <div className='comment-comment-container'>{reply.reply} </div>
                                    </div>
                                </div>
                            })
                            }

                        </div> : null
                    }


                </div>
                <div className='but-div'>
                {

                    isReplying == discussion.id ? <button onClick={() => {
                        setIsReplying(null);
                }} className='comment-button'>Close Reply</button> : <button onClick={() => {
                    setIsReplying(discussion.id);
            }} className='comment-button'>Reply</button>

                }
                 </div>
                 <div className='but-div'>
                 {
                    isViewingReply == discussion.id  ? <button onClick={() => viewReplyHandler(null)}>Close View</button> : 
                    <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                 }
                 </div>
            </div>
            )


        }

        // return <div key={discussion.id}>
                        // <div className='comment-name-continaer'><img src="/user-icon.png" />{discussion.author.name}</div>
                        // <div className='comment-comment-container'>{discussion.comment} </div>



                    //     {

                    //         discussion.id != isReplying ?
                    //         <div>
                            //     <button onClick={() => {
                            //     setIsReplying(discussion.id);
                            // }} className='comment-button'>Reply</button>
                            
                            // <button onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>

                    //         </div> :

                                // <div>
                                //     <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' />
                                //     <button onClick={() => postReplyHandler(discussion.id)}>Post Reply</button>
                                // </div>
                    //     }
                    // </div>

    }

    const style = {
        color: "#000",
      };
      const style2 = {
        fontWeight: "bold",
        
      };
      const style3 = {
        color: "#000",
        fontWeight: "bold",
      };

    return <div className='discussion-parent-conatiner' style={{ paddingTop: "5rem" }}>
    <div className="discussion-image">
      <div className="container">
            <div className='row'>
            <div className="col-md-12 dis-img">
                


            <h1 style={style3}>Discussion Forum</h1>
            <div className='hhh'></div>
            <p style={style}>
                <a style={style}  href="/" className='good'>
                  Home
                </a>{" "}
                     /                 <span  className='reg'>Discussion Forum</span>
              </p>
            </div>
          </div>
          </div>
      </div>
        {/* {isAuth ? <div className='text-area-container'>
            <textarea value={comment} onChange={handleOnChange} placeholder='Please enter some text' />
            <button onClick={postcomment}> Comment </button>
        </div> : <h2>Login to post comments</h2> } */}
        
        <div>
            <textarea className='text-area-container' value={comment} onChange={handleOnChange} placeholder='Place your comments here!' />
        </div>
        <div className='comment-buttonn '><br></br><button onClick={postcomment}> Comment </button></div><br /><br /><br /><br /><br /><br />


        {

            discussions == null ? <h1>Loading Comments</h1> : discussions.length === 0 ? <h1>No Comments Right now.</h1> : <div>    
            {
                discussions.map((discussion) => {
                        return loadCommentUI(discussion);
                })
            }</div>
        }





    </div>
}

export default Discussion