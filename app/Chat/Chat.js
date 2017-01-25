import React from 'react';

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            newMessage: '',
            messages: [],
            socket: window.io('http://localhost:3000'),
            user: undefined
        }
    }


    componentDidMount() {
        var self = this;
        this.state.socket.on("receive-message", (msg) => {
            console.log('msg', msg)
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

}

    handleChangeUser(event) {
        this.setState({user: event.target.value})
    }


    render() {
        return (
            <div>
                <ul id="messages">
                    <AllMessages messages={this.state.messages}></AllMessages>
                </ul>
                
                <form onSubmit = {this.handleSubmit.bind(this)} action="">
                    <input onChange={this.handleChangeUser.bind(this)} id="username" type="text" placeholder="username" />
                    <input onChange={this.handleChange.bind(this)} id="m" autoComplete="off" placeholder="type a message" />
                    <button>Send</button>
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