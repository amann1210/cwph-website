import React, { useEffect, useState } from 'react'
import { ReactDOM } from 'react'
import "./Discussion.css"


function Comments(props) {
    return (<div>
        <div className='comment-name-continaer'><img src={props.image} />{props.name}
        <div className='time'><span>{props.time}</span></div>
    </div>
        <div className='comment-comment-container'>{props.comment} <br /></div>
        </div>
    );
}

export default Comments