import { connect } from 'react-redux';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';
import { formatTimestamp } from '../../utils';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../ImpulseSocket';

// f5f7fb
// rx: #d9e5cf, sent: #d3eebe

const ConversationContainer = styled.div``;

const MessageContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: ${({ type }) =>
		type === 'SENT' ? 'flex-end' : 'flex-start'};
`;

const Message = styled.div`
	width: auto;
	min-width: 80px;
	max-width: 420px;
	padding: 8px 12px 10px;
	margin-bottom: 5px;
	background: ${({ type }) => (type === 'SENT' ? '#d3eebe' : '#d9e5cf')};
	border-radius: 0 8px 8px;
	position: relative;
	${({ type }) => `
        &::${type === 'SENT' ? 'after' : 'before'} {
            content: '';
            position: absolute;
            width: 0;
            top: 0;
            ${type === 'SENT' ? 'right: -10px;' : 'left: -10px'};
            border-top: 10px solid ${type === 'SENT' ? '#d3eebe' : '#d9e5cf'};
            border-right: 10px solid ${
							type === 'SENT' ? 'transparent' : '#d9e5cf'
						};
            border-bottom: 5px solid transparent;
            border-left: 10px solid ${
							type === 'SENT' ? '#d3eebe' : 'transparent'
						};
        }
	`}
	@media (max-width: 500px) {
		width: 70%;
	}
	@media (min-width: 768px) and (max-width: 1024px) {
		max-width: 250px;
	}
	& div.ant-typography, .ant-typography p {
		margin-bottom: 7px;
	}
`;

const MessageTime = styled(Text)`
	position: absolute;
	bottom: 2px;
	right: 10px;
	font-size: 10px;
`;

// type: RECEIVED/SENT

const messages = [
	{
		type: 'RECEIVED',
		text: 'hello from this contact!\n how are you?',
		timestamp: '9:43 pm',
	},
	{
		type: 'SENT',
		text: 'Hi!',
		timestamp: '9:51 pm',
	},
	{
		type: 'SENT',
		text: `I'm doing great! how about you?`,
		timestamp: '9:51 pm',
	},
	{
		type: 'RECEIVED',
		text: 'pumped!',
		timestamp: '9:53 pm',
	},
	{
		type: 'RECEIVED',
		text: 'hello from this contact!\n how are you?',
		timestamp: '9:43 pm',
	},
	{
		type: 'SENT',
		text: 'Hi!',
		timestamp: '9:51 pm',
	},
	{
		type: 'SENT',
		text: `I'm doing great! how about you?`,
		timestamp: '9:51 pm',
	},
	{
		type: 'RECEIVED',
		text: 'pumped!',
		timestamp: '9:53 pm',
	},
	{
		type: 'RECEIVED',
		text: 'hello from this contact!\n how are you?',
		timestamp: '9:43 pm',
	},
	{
		type: 'SENT',
		text: 'Hi!',
		timestamp: '9:51 pm',
	},
	{
		type: 'SENT',
		text: `I'm doing great! how about you?`,
		timestamp: '9:51 pm',
	},
	{
		type: 'RECEIVED',
		text: 'pumped!',
		timestamp: '9:53 pm',
	},
	{
		type: 'RECEIVED',
		text: 'hello from this contact!\n how are you?',
		timestamp: '9:43 pm',
	},
	{
		type: 'SENT',
		text: 'Hi!',
		timestamp: '9:51 pm',
	},
	{
		type: 'SENT',
		text: `I'm doing great! how about you?`,
		timestamp: '9:51 pm',
	},
	{
		type: 'RECEIVED',
		text: 'pumped!',
		timestamp: '9:53 pm',
	},
];

const MessageContent = ({ chatMessages, userId, receiverId }) => {
	return (
		<ConversationContainer>
			{chatMessages.map((message, index) => (
				<MessageContainer key={index} type={message.type}>
					<Message type={message.type}>
						<Paragraph>{message.text}</Paragraph>
						<MessageTime type='secondary'>
							{formatTimestamp(message.timestamp)}
						</MessageTime>
					</Message>
				</MessageContainer>
			))}
		</ConversationContainer>
	);
};

const mapStateToProps = (state) => {
	const { chats } = state;
	const chatMessages = chats.data?.[chats.activeChat] || [];
	return {
		chatMessages,
		userId: state.user.data?.mobile,
		receiverId: state.chats.activeChat,
	};
};

export default connect(mapStateToProps)(MessageContent);
