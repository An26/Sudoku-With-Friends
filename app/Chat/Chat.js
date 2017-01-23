import React from 'react';

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            newMessage: '',
            messages: [],
            socket: window.io('http://localhost:3000/chat')

        }
    }

    componentDidMount() {
        this.state.socket.on("receive-message", (msg) => {
            this.setState({messages: this.state.messages.push(msg)})
            console.log('msg',this.state.messages);
        })
    }

    handleChange(event) {
        let newMessage = event.target.value;
       this.setState({newMessage: newMessage});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.socket.emit("new-message", this.state.newMessage);
        console.log(this.state.newMessage)
}


    render() {
        let self = this;
        return (
            <div>
                <ul id="messages"></ul>
                <form onSubmit = {this.handleSubmit.bind(this)} action="">
                    <input onChange={this.handleChange.bind(this)} id="m" autoComplete="off" />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}