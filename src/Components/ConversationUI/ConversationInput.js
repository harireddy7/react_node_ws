import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import SendOutlined from '@ant-design/icons/SendOutlined';
import { Button } from 'antd';
import { SocketContext } from '../ImpulseSocket';
import { updateChatMessages } from '../../redux/actions/chats';

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

const ConversationInput = ({ userId, activeChatId, allChats, updateChat }) => {
	const [userMessage, setUserMessage] = useState('');

	const { socket } = useContext(SocketContext);

	const handleChange = (e) => {
		setUserMessage(e.target.value);
	};

	const handleSendMessage = () => {
		const convoObj = {
			text: userMessage.trim(),
			sender: userId,
			receiver: activeChatId,
			timestamp: Date.now(),
		}

		updateChat({
			data: convoObj,
			allChats,
			type: 'SENT',
		});

		if (socket) {
			socket.emit('inputMessage', convoObj);
		}
		setUserMessage('');
	};

	return (
		<FlexContainer>
			<MessageArea
				placeholder='Send a message...'
				autoSize={{ minRows: 1, maxRows: 2 }}
				value={userMessage}
				onChange={handleChange}
			/>
			<SendMessageButton
				icon={<SendOutlined />}
				onClick={handleSendMessage}
			/>
		</FlexContainer>
	);

}

const mapStateToProps = state => {
	return {
		allChats: state.chats.data || {},
		userId: state.user.data?.mobile,
		activeChatId: state.chats.activeChat,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateChat: (payload) => dispatch(updateChatMessages(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationInput);
