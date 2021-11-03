import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { updateChatMessages } from '../redux/actions/chats';

const WS_URL =
	process.env.NODE_ENV === 'production'
		? window.location.origin
        : 'http://localhost:8080';
        

export const SocketContext = React.createContext();

const ImpulseSocket = ({ id, children, allChats, updateChat }) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socketRef = io.connect(WS_URL, {
			query: {
				id,
			},
			reconnection: true,
        });
        setSocket(socketRef);

        return () => socketRef.close();
    }, [id]);

    useEffect(() => {
        if (socket) {
            socket.on('outputMessage', data => {
                updateChat({
                    data,
                    allChats,
                    type: 'RECEIVED',
                })
            });
        }

        return () => {
            if (socket) socket.off('outputMessage');
        }
    }, [socket, allChats])


    return (
        <SocketContext.Provider value={{ socket, id }}>
            {children}
        </SocketContext.Provider>
    )
}

const mapStateToProps = state => {
	return {
		allChats: state.chats.data || {},
	};
}

const mapDispatchToProps = dispatch => {
	return {
		updateChat: (payload) => dispatch(updateChatMessages(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImpulseSocket);
