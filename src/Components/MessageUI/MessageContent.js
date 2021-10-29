import { connect } from 'react-redux';

const MessageContent = ({ contact }) => {
    return (
        <div>
            Messages of {contact.name}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contact: state.contacts.activeContact,
    }
}

export default connect(mapStateToProps)(MessageContent);
