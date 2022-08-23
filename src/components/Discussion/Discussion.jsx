import React, { useEffect, useState } from 'react'
import "./Discussion.css"
import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { isDOMComponent } from 'react-dom/test-utils';
import Comments from "./comments"


let Discussion = () => {

    

    const commentCollectionRef = collection(db, "Comments")
    const replyCollectionRef = collection(db, "Replys");

    let [discussions, setDiscussions] = useState(null)
    let [comment, setComment] = useState("");
    let [reply, setReply] = useState("");
 



    let [isReplying, setIsReplying] = useState(null);
    // isReply => either null or id of the comment

    let [isViewingReply, setIsViewingReply] = useState(null);
    //  isViewingReply => either null or id of the comment

    let [replies, setReplies] = useState([]);
    // 
    // console.log(IsAuth)

    const getComments = async () => {

        let data = await getDocs(commentCollectionRef);
        data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        data = data.filter((data)=>{
            return data.comment.length != 0
        })
        console.log(data);
        setDiscussions(data);
 };


    const getReplies = async (commentId) => {
        let replys = await getDocs(replyCollectionRef);
        replys = replys.docs.map((reply) => ({ ...reply.data(), id: reply.id }));
        replys = replys.filter((reply) => {
            return reply.pid == commentId && reply.reply.length != 0
        }).sort((c, d) => new Date(c.createdAt).getTime() - new Date(d.createdAt).getTime());

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
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, profilePic: auth.currentUser.photoURL },
                comment,
                createdAt: (new Date()).toString().substring(0, 21),
                pid: null
            });

        setComment("")
        getComments();
    };

    // let handleOnChange = (e) => {
    //     if (!e.target.value) {
    //         console.alert('empty')
    //       }
    //       else
    //     setComment(e.target.value);
    // }

    const handleClick = event => {
        event.preventDefault();
    
        if (message.trim().length == 0) {
          console.log('input value is empty');
        } 
        else{
            setComment(e.target.value);
        }
      };

    let postReplyHandler = async (pid) => {
        setIsReplying(null);
        await addDoc(replyCollectionRef,
            {
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, profilePic: auth.currentUser.photoURL },
                reply,
                createdAt: (new Date()).toString().substring(0, 21),
                pid: pid
            });
        setReply("");
    }

    let viewReplyHandler = async (pid) => {
        setIsViewingReply(pid);
        if (pid == null) {
            return;
        }
        let replys = await getReplies(pid);
        // console.log(replys[0])

        setReplies(replys);
        return replys;
    }


    let loadCommentUI = (discussion) => {

        if (isViewingReply == null && isReplying == null) {
            return (<div className ="homepage" key={discussion.id}>
               <Comments 
               name = {discussion.author.name} 
               image = {discussion.author.profilePic} 
               time = {discussion.createdAt} 
               comment = {discussion.comment}/>
              
            
                <div className='but-div'>
                    <button onClick={() => {
                        setIsReplying(discussion.id);
                    }} className='comment-button'>Reply</button>
                    <button onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                </div>

            </div>
            )
        }

        else if (isViewingReply == null && isReplying != null) {

            return (<div className ="homepage" key={discussion.id}>
               <Comments 
               name = {discussion.author.name} 
               image = {discussion.author.profilePic} 
               time = {discussion.createdAt} 
               comment = {discussion.comment}/>

                {
                    isReplying == discussion.id ? <div>
                        <div className='post2'>
                            <textarea className='area' value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' /><br />
                            <button className='post' onClick={() => postReplyHandler(discussion.id)}>Post</button>
                            <button onClick={() => {
                            setIsReplying(null);
                        }}className='post_cancel'><u>Cancel</u></button>
                        </div>
                    </div> : null
                }
                <div className='but-div'>
                    {
                        isReplying == discussion.id ? null : <div><button onClick={() => {
                            setIsReplying(discussion.id);
                        }} className='comment-button'>Reply</button>
                        <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)
                        
                    }>View Reply</button></div>

                    }

                    
                </div>
            </div>
            )
        }

        else if (isViewingReply != null && isReplying == null) {
            return (<div className ="homepage" key={discussion.id}>
                <Comments 
               name = {discussion.author.name} 
               image = {discussion.author.profilePic} 
               time = {discussion.createdAt} 
               comment = {discussion.comment}/>


                <div>
                    {
                        isViewingReply == discussion.id ? <div>
                            {
                                replies.map((reply) => {
                                    return <div key={reply.id}>
                                        <div className='reply'>
                                            <div className='comment-name-continaer-reply'><img src={reply.author.profilePic} />{reply.author.name}
                                                <div className='time-reply'>{reply.createdAt}</div></div>
                                            <div className='comment-reply-container'>{reply.reply} </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div> : null
                    }


                </div >
                <div className='but-div'>


                   

                    {
                        isViewingReply == discussion.id ? <button className='comment-button' onClick={() => viewReplyHandler(null)}>Close View</button> :
                           <div>
                             <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                             <button onClick={() => {
                        setIsReplying(discussion.id);
                    }} className='comment-button'>Reply</button>
                    </div>
                    }
                </div>
            </div>
            )
        }

        else {

            return (<div className ="homepage" key={discussion.id}>
           <Comments 
               name = {discussion.author.name} 
               image = {discussion.author.profilePic} 
               time = {discussion.createdAt} 
               comment = {discussion.comment}/>

                {
                    isReplying == discussion.id ? <div className='post2'>
                        <textarea className='area' value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' /><br />
                        <button className='post' onClick={() => postReplyHandler(discussion.id)}>Post Reply</button><br /><br />
                    </div> : null
                }

                <div>
                    {
                        isViewingReply == discussion.id ? <div>
                            {
                                replies.map((reply) => {
                                    return <div key={reply.id}>
                                        <div className='reply'>
                                            <div className='comment-name-continaer'><img src={reply.author.profilePic} />{reply.author.name}
                                                <div className='time-reply'>{reply.createdAt}</div>
                                            </div>
                                            <div className='comment-reply-container'>{reply.reply} </div>
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


                    {
                        isViewingReply == discussion.id ? <button onClick={() => viewReplyHandler(null)}>Close View</button> :
                            <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                    }
                </div>
            </div>
            )


        }

        

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
                            <a style={style} href="/" className='good'>
                                Home
                            </a>{" "}
                            /                 <span className='reg'>Discussion Forum</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
        

      
                
        <div>
        
            <textarea className='text-area-container' value={comment}  onclick ={handleClick} placeholder='Place your comments here!' />
        </div>
        <div className='comment-buttonn '><button onClick={postcomment}> Comment </button></div><br /><br /><br />


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