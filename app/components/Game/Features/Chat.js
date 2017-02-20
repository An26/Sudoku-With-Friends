import React from 'react';
import cookie from 'react-cookie';

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            newMessage: {},
            messages: [],
            socket: window.io('http://localhost:3000'),
            user: cookie.load('username')
        }
    }

    componentDidMount() {
        var self = this;
        this.state.socket.on("receive-message", (msg) => {
            var messages = self.state.messages;
                messages.push(msg);
            self.setState({messages: messages})
        })
}

    handleChange(event) {
        let newMessage = event.target.value;
        newMessage = {
            body: newMessage,
            user: this.state.user || "guest"
        };
        this.setState({newMessage: newMessage});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.socket.emit("new-message", this.state.newMessage);
        this.input.value = ""
    }

    render() {
        return (
            <div>
                <ul id="messages">
                    <AllMessages messages={this.state.messages}></AllMessages>
                </ul>
                
                <form onSubmit = {this.handleSubmit.bind(this)} action="">
                    <input ref={(input) => this.input = input} onChange={this.handleChange.bind(this)} id="m" autoComplete="off" placeholder="type a message" />
                    <button  className="btn btn-default">Send</button>
                </form>
            </div>
        )
    }
}

const AllMessages = (props) => {
    return (
        <div>
        {props.messages.map((msg, i) => {
            return <li key = {i}><strong>{msg.user}</strong> : <span>{msg.body}</span></li>;
        })}
        </div>
    );
}