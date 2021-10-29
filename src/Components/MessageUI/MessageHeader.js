import AvatarName from '../AvatarName';

const MessageHeader = ({ contact }) => {
    return (
        <div>
            <AvatarName name={contact.name} avatar={contact.avatar} />
        </div>
    )
}

export default MessageHeader
