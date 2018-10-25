import React, { Component } from 'react';

const messages = {
  hotkey: 'Press\xa0Alt+Enter\xa0to\xa0post',
  empty:  'Posts\xa0can\'t\xa0be\xa0empty'
}

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      message: messages.hotkey,
      alert: false,
      loading: false
    }
  }

  handleChange(event) {
    this.setState({text: event.target.value});
    setTimeout(() => this.setState({message: messages.hotkey, alert: false}), 0);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({alert: false});
    const text = this.state.text.trim();
    if(text === '') {
      setTimeout(() => this.setState({message: messages.empty, alert: true}), 100);
      return;
    }
    this.setState({loading: true});
    this.props.addPost(this.props.id, text)
    .then(() => this.setState({text: '', loading: false}));
  }

  handleShortcut(event) {
    if (event.keyCode === 13 && event.altKey) {
      event.preventDefault();
      this.refs.submit.click();
    }
  }

  render() {
    return (
      <form className='form floaty' onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          className='formTextarea' rows='7'
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleShortcut.bind(this)} />
        <div className='formButtons'>
          <input className='formSubmit btn' type='submit' value='Post' ref='submit' />
          <span className={`formMessageBox ${this.state.alert ? 'textAlert' : ''}`}>
            {this.state.message}
          </span>
        </div>
      </form>
    );
  }
}

export default PostForm;