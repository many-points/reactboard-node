import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date';
import { checkDubs } from '../utils/dubs';

import Post from './Post';

class ThreadPreview extends Component {
  render() {
    const date = formatDate(new Date(this.props.createdAt));
    const threadUpdatedAt = formatDate(new Date(this.props.threadUpdatedAt));
    const humanId = this.props.humanId || 'nothing';
    const dubs = checkDubs(humanId);
    const postCount = this.props.postCount;
    const opPost = (
      <li key='op'>
      <div className='post threadOp slide-up'>
      <div className='postTop'>
        <div className='postTopLeft'>
          <a href='#' className={`postId ${dubs ? 'dubs' : ''}`}>
            <span>{humanId}</span>
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
          <span className='postCount'>{`Total\xa0posts:\xa0${this.props.postCount}`}</span>
        </div>
        <div className='postBottomRight'>
          <span className='lastPostTimestamp'>{`Last\xa0update:\xa0${threadUpdatedAt}`}</span>
        </div>
      </div>
    </div>
    </li>
    );
    const posts = this.props.posts.map((post, index) => {
      return ((post._id !== this.props.id) &&
        <li key={post._id}>
          <Post id={post._id}
                humanId={post.humanId}
                text={post.text}
                createdAt={post.createdAt}
                isOp={false} />
        </li>
      );
    });
    return (
      <ul className='threadPreview unstyled floaty'>
        {opPost}
        {posts}
      </ul>
    );
  }
}

ThreadPreview.propTypes = {
  id:              PropTypes.string.isRequired,
  humanId:         PropTypes.string.isRequired,
  text:            PropTypes.string,
  createdAt:       PropTypes.string.isRequired,
  linkTo:          PropTypes.string.isRequired,
  threadUpdatedAt: PropTypes.string.isRequired

}

export default ThreadPreview;