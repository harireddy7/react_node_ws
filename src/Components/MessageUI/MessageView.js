import { Empty } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import NoMessagesSvg from '../../assets/no_messages.svg';

const StyledHeader = styled(Header)`
    background: #c6f6d9;
    border-radius: 8px 8px 0 0;
    padding: 0px 16px;
`

const StyledContent = styled(Content)`
    flex: 1;
    padding: 0 20px;
`

const StyledFooter = styled(Footer)`
    border-radius: 0 0 8px 8px;
    background: #c6f6d9;
`

const MessageView = ({ activeContact }) => {

    if (!activeContact) {
        return (
            <Layout style={{ height: '100%', borderRadius: '8px 8px 0 0', justifyContent: 'center', alignItems: 'center' }}>
                <Empty image={NoMessagesSvg} imageStyle={{ height: 200, marginBottom: 20 }} description='Select a chat to view messages!' />
            </Layout>
        )
    }

    return (
        <Layout style={{ height: '100%', borderRadius: '8px 8px 0 0' }}>
            <StyledHeader>
                <MessageHeader contact={activeContact} />
            </StyledHeader>
            <StyledContent>
                <MessageContent />
            </StyledContent>
            <StyledFooter>
                <MessageInput />
            </StyledFooter>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        activeContact: state.contacts.activeContact,
    }
}

export default connect(mapStateToProps)(MessageView);
