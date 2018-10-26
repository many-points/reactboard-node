import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date';
import { checkDubs } from '../utils/dubs';

class ThreadPreview extends Component {
  render() {
    const date = formatDate(new Date(this.props.createdAt));
    const threadUpdatedAt = this.props.isThread ? formatDate(new Date(this.props.threadUpdatedAt)) : null;
    const humanId = this.props.humanId || 'nothing';
    const dubs = checkDubs(humanId);
    const opPost = (
      <li key='op'>
      <div className='post slide-up'>
      <div className='postTop'>
        <div className='postTopLeft'>
          <a href='#' className={`postId ${dubs ? 'dubs' : ''}`}>
            <span>{humanId}</span>
            {this.props.isOp && <>{'~'}<span className='op'>op</span></>}
          </a>
          {this.props.linkTo && <Link className='postLink' to={`/thread/${this.props.linkTo}`}>~</Link>}
        </div>
        <div className='postTopRight'>
          <span className='postTimestamp'>{date}</span>
        </div>
      </div>
      <p className='postText unstyled'>{this.props.text}</p>
      <div className='postBottom'>
        <div className='postBottomLeft'>
        </div>
        <div className='postBottomRight'>
          <span className='lastPostTimestamp'>{`Last\xa0update:\xa0${threadUpdatedAt}`}</span>
        </div>
      </div>
    </div>
    </li>
    );
    return (
      <ul className='threadPreview unstyled   floaty'>
        {opPost}  
      </ul>
    );
  
  }
}

export default ThreadPreview;