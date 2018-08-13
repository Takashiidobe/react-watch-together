//our imports
import React, { Component } from "react";
import io from "socket.io-client";
//our backend server that we're connecting to
const socket = io("http://localhost:4004");
//class with state (skip constructor/super because we have no other components)
class Chat extends Component {
  //messages is a list of messages sent
  //message content is what the user is typing
  //set the username as the socketid
  constructor() {
    super();
    this.state = {
      messages: [],
      messageContent: "",
      username: "anonymous",
      notifications: [],
      typing: false,
      chatters: [],
      roomID: ""
    };
  }

  //when a message event is emitted, make sure to prepend the message to the beginning of the message state
  componentDidMount() {
    this.setState({
      roomID: window.location.href.substr(
        window.location.href.lastIndexOf("/") + 1
      )
    });
    socket.on("connect", () => {
      socket.emit("join room", {
        roomID: this.state.roomID
      });
    });

    socket.on("send message", message => {
      console.log(message);
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }
  //what happens when we type in a message

  handleSubmit = e => {
    const body = e.target.value;
    if (e.keyCode === 13 && body) {
      const message = {
        body,
        from: this.state.username
      };
      socket.emit("message", message, this.state.roomID);
      e.target.value = "";
    }
  };
  handleUsername = e => {
    const username = e.target.value;
    if (e.keyCode === 13 && username) {
      this.setState({
        username
      });
      e.target.value = "";
    }
  };
  //what happens when we want to clear the chat
  handleClear = () => {
    this.setState({ messages: [] });
  };

  componentWillUnmount() {
    socket.removeAllListeners();
  }
  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <li key={index}>
          <b>{message.from}: </b>
          {message.body}
        </li>
      );
    });
    const isTyping = this.state.chatters.map((username, index) => {
      return (
        <div id="typing" key={index}>
          {username.from} is typing...
        </div>
      );
    });
    return (
      <div id="chat">
        <div id="chat-title">React Chat</div>
        <div className="chat">
          {`You're appearing as "${this.state.username}" in this chat`}
          <div id="username">
            <div id="username-title">
              {this.state.username !== "anonymous"
                ? `Change your username`
                : `Choose a username`}
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Enter your username..."
                onKeyUp={this.handleUsername}
                maxLength={16}
              />
            </form>
          </div>
          <div id="chat-header">Chat here</div>
          <div id="chat-messages">{messages}</div>
          <div id="chat-message">
            <input
              type="text"
              placeholder="Enter a message..."
              onKeyUp={this.handleSubmit}
              maxLength={200}
            />
          </div>
          <div id="clear-chat">
            <input
              type="submit"
              value="clear chat"
              onClick={this.handleClear}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
