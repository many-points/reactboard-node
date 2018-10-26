import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date';
import { checkDubs } from '../utils/dubs';

function Post(props) {
  const date = formatDate(new Date(props.createdAt));
  const threadUpdatedAt = props.isThread ? formatDate(new Date(props.threadUpdatedAt)) : null;
  const humanId = props.humanId || 'nothing';
  const dubs = checkDubs(humanId);
  return (
    <div className='post slide-up'>
      <div className='postTop'>
        <div className='postTopLeft'>
          <a href='#' className={`postId ${dubs ? 'dubs' : ''}`}>
            <span>{humanId}</span>
            {props.isOp && <>{'~'}<span className='op'>op</span></>}
          </a>
          {props.linkTo && <Link className='postLink' to={`/thread/${props.linkTo}`}>~</Link>}
        </div>
        <div className='postTopRight'>
          <span className='postTimestamp'>{date}</span>
        </div>
      </div>
     <p className='postText unstyled'>{props.text}</p>
     <div className='postBottom'>
      <div className='postBottomLeft'>
      </div>
      <div className='postBottomRight'>
        {props.isThread && <span className='lastPostTimestamp'>{`Last\xa0update:\xa0${threadUpdatedAt}`}</span>}
      </div>
     </div>
    </div>
  );
}

export default Post;