import React, { Component } from 'react';

class Form extends Component {
  messages = {
    default: '',
    hotkey: 'Press\xa0Alt+Enter\xa0to\xa0post',
    empty:  'Posts\xa0can\'t\xa0be\xa0empty'
  }

  buttonText = 'Post';

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      message: 'hotkey',
      alert: false,
      loading: false,
      filename: '',
      file: null
    }
    if(props.threadForm) {
      this.messages.hotkey = 'Press\xa0Alt+Enter\xa0to\xa0create\xa0thread';
      this.buttonText = 'Create';  
    }
  }
  
  handleChange(event) {
    this.setState({text: event.target.value});
    setTimeout(() => this.setState({message: 'hotkey', alert: false}), 0);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({alert: false});
    const text = this.state.text.trim();
    const filename = this.state.filename.trim();
    const file = this.state.file;
    if(text === '') {
      setTimeout(() => this.setState({message: 'empty', alert: true}), 100);
      return;
    }
    this.setState({loading: true});
    this.props.submit({text}, {file})
    .then(res => {
      this.setState({text: '', loading: false})
    });
  }

  handleShortcut(event) {
    if (event.keyCode === 13 && event.altKey) {
      event.preventDefault();
      this.refs.submit.click();
    }
  }

  uploadFile(event) {
    this.setState({
      filename: event.target.files[0].name,
      file: event.target.files[0],
    });
  }

  fileButton(event) {
    event.preventDefault();
    this.refs.file.click();
  }

  render() {
    return (
      <div className='floaty'>
        <form className='form slide-up' onSubmit={this.handleSubmit.bind(this)}>
          <textarea
            className='formTextarea' rows='7'
            value={this.state.text}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleShortcut.bind(this)} />
          <div className='formButtons'>
            <div className='formRight'>
              <input className='formSubmit btn' type='submit' value={this.buttonText} ref='submit' />
              <button className='formFile btn' onClick={this.fileButton.bind(this)}>
                <span>Upload file</span>
              </button>
              <input ref='file' type='file' style={{display: 'none'}} onChange={this.uploadFile.bind(this)} />
              <div className='formFilename'>{this.state.filename && `File:\xa0${this.state.filename}`}</div>
            </div>
            <div className='formLeft'>
              <div className={`formMessageBox ${this.state.alert ? 'textAlert' : ''}`}>
                {this.messages[this.state.message]}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;