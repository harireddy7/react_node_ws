import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Empty } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import MessageContent from './ConversationContent';
import MessageHeader from './ConversationHeader';
import MessageInput from './ConversationInput';
import NoMessagesSvg from '../../assets/no_messages.svg';
import doodleBg from '../../assets/doodle-wallpaper.jpg'

const StyledHeader = styled(Header)`
    background: #f5f7f4;
    border-radius: 8px 8px 0 0;
    padding: 0px 16px;
    z-index: 999;
`

const StyledContent = styled(Content)`
    flex: 1;
    padding: 0 20px;
    position: relative;
    // background: #eef0ed;
    overflow-y: auto;
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
    @media (min-width: 1200px) {
        padding: 0 50px;
    }
    @media (min-width: 1440px) {
        padding: 0 100px;
    }
`

const DoodleUnderlay = styled.div`
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${doodleBg});
    opacity: 0.08;
    background-repeat: repeat;
`

const StyledFooter = styled(Footer)`
    border-radius: 0 0 8px 8px;
    background: #f5f7f4;
    padding: 15px 20px;
    z-index: 99;
    @media (max-width: 425px) {
		padding: 5px 10px;
	}
`

const ConversationView = ({ activeContact }) => {

    useEffect(() => {
        const convoContent = document.getElementById('conversation-content');
        if (convoContent) {
            convoContent.scrollTo({
                left: 0,
                top: convoContent.scrollHeight,
                // behavior: 'smooth'
            });
        }
    }, [activeContact])

    if (!activeContact) {
        return (
            <Layout style={{ height: '100%', borderRadius: '8px', justifyContent: 'center', alignItems: 'center' }}>
                <Empty image={NoMessagesSvg} imageStyle={{ height: 200, marginBottom: 20 }} description='Select a chat to view messages!' />
            </Layout>
        )
    }

    return (
        <Layout style={{ height: '100%', borderRadius: '8px', position: 'relative' }}>
            <DoodleUnderlay />
            <StyledHeader>
                <MessageHeader contact={activeContact} />
            </StyledHeader>
            <StyledContent id='conversation-content'>
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

export default connect(mapStateToProps)(ConversationView);
