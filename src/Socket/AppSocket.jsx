import { Component } from 'react'
import io from 'socket.io-client';

const getWSURL = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8080';

export class AppSocket extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.socket = io.connect(getWSURL, {
            query: {
                testKey: 'test value'
            },
            reconnection: true
        });
        console.log('connecting to socket...')

        this.socket.on('connected', () => {
            console.log('Connected to socket!')
        });

        this.socket.on('message-received', msg => {
            this.props.receiveMsg(msg)
        })
    }

    componentDidUpdate() {
        this.socket.emit('chat-message', this.props.value)
    }

    render() {
        return this.props.children
    }
}

export default AppSocket
