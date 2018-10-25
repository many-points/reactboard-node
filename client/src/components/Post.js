import React, { Component } from 'react';
import { formatDate } from '../utils/date';
import { checkDubs } from '../utils/dubs';

function Post(props) {
  const date = formatDate(new Date(props.createdAt));
  const humanId = props.humanId || 'nothing';
  const dubs = checkDubs(humanId);
  return (
    <div className='post floaty'>
     <div className='postMetadata'>
      <a href='#' className={`postId ${dubs ? 'dubs' : ''}`}>
       <span>{humanId}</span>
      </a>
      <span className='postTimestamp'>{date}</span>
     </div>
     <p className='postText unstyled'>{props.text}</p>
    </div>
  );
}

export default Post;