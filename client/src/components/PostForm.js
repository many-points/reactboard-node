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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.text === '') {
      this.setState({message: messages.empty, alert: true});
      setTimeout(() => this.setState({alert: false}), 1000);
      setTimeout(() => this.setState({message: messages.hotkey}), 3000);
      return;
    }
    this.setState({loading: true});
    this.props.addPost(this.props.id, this.state.text)
    .then(() => this.setState({text: '', loading: false}));
  }

  render() {
    return (
      <form className='form floaty' onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          className='formTextarea' rows='7'
          value={this.state.text}
          onChange={this.handleChange} />
        <div className='formButtons'>
          <input className='formSubmit btn' type='submit' value='Post' />
          <span className={`formMessageBox ${this.state.alert ? 'textAlert' : ''}`}>
            {this.state.message}
          </span>
        </div>
      </form>
    );
  }
}

export default PostForm;