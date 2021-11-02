import { Component } from 'react';
import io from 'socket.io-client';
import TextArea from 'antd/lib/input/TextArea';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { Button } from 'antd';
import styled from 'styled-components';

const WS_URL =
	process.env.NODE_ENV === 'production'
		? window.location.origin
		: 'http://localhost:8080';

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const MessageArea = styled(TextArea)`
	width: 95%;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: #eef0ed;
	}
	::-webkit-scrollbar-thumb {
		background: #ccc;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	border-radius: 21px;
	border: none;
	padding: 10px 20px;
	&:focus,
	&:hover,
	&:active {
		border: none;
	}
`;

const SendMessageButton = styled(Button)`
	border: none;
	padding: 5px;
	background: transparent;
	border-radius: 50%;
	& svg {
		font-size: 22px;
	}
	&:focus,
	&:hover {
		background: #eef0ed;
	}
`;

class ConversationInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userMessage: '',
		};
		this.messageFromServer = this.messageFromServer.bind(this);
	}

	componentDidMount() {
		this.socket = io.connect(WS_URL, {
			query: {},
			reconnection: true,
		});

		this.socket.on('connected', () => {
			console.log('connected to socket!');
		});

		this.socket.on('message', (data) => {
			this.messageFromServer(data);
		});
	}

	handleChange = (e) => {
		this.setState({ userMessage: e.target.value });
	};

	messageFromServer(msg) {
        // console.log(this.socket)
		console.log('Server: ', msg);
	}

	handleSendMessage = () => {
        // console.log(this.socket)
        // this.setState({ userMessage: this.state.value });
        this.socket.emit('chatMessage', this.state.userMessage)
	};

	render() {
		const { userMessage } = this.state;
		return (
			<FlexContainer>
				<MessageArea
					placeholder='Send a message...'
					autoSize={{ minRows: 1, maxRows: 2 }}
					value={userMessage}
					onChange={this.handleChange}
				/>
				<SendMessageButton
					icon={<SendOutlined />}
					onClick={this.handleSendMessage}
				/>
			</FlexContainer>
		);
	}
}

export default ConversationInput;
