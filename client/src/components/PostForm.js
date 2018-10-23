import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <form className='form floaty'>
       <textarea className='formTextarea' rows='7' />
       <div className='formButtons'>
        <input className='formSubmit btn' type='submit' value='Post' />
        <span className='formMessageBox'>Press&nbsp;Alt+Enter&nbsp;to&nbsp;post</span>
       </div>
      </form>
    );
  }
}

export default PostForm;