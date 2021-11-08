import AvatarName from '../AvatarName';
import MoreOutlined from '@ant-design/icons/MoreOutlined'
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveChat } from '../../redux/actions/chats';
import { setActiveContact } from '../../redux/actions/contacts';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { checkIfMobile } from '../../utils';

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MoreOptions = styled(Button)`
    border: none;
    background: transparent;
    border-radius: 50%;
    & svg {
        font-size: 22px;
    }
    &:focus, &:hover {
        background: #eef0ed;
    }
`

const MenuItem = styled(Menu.Item)`
    padding: 10px 20px;
    width: 150px;
`

const menu = (
    <Menu>
      <MenuItem>
        Contact info
      </MenuItem>
      <MenuItem>
        Delete chat
      </MenuItem>
    </Menu>
  );

const ConversationHeader = ({ contact, storeActiveChat, storeActiveContact }) => {
    const history = useHistory();
    const screens = useBreakpoint();
    const isMobile = checkIfMobile(screens);

    const handleBack = () => {
        storeActiveChat(null);
        storeActiveContact(null);
        history.goBack();
    }

    return (
        <FlexContainer>
            {isMobile && <ArrowLeftOutlined style={{ marginRight: 10 }} onClick={handleBack} />}
            <AvatarName name={contact.name} avatar={contact.image} space='small' />
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <MoreOptions icon={<MoreOutlined />} />
            </Dropdown>
        </FlexContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        storeActiveChat: (id) => dispatch(setActiveChat(id)),
        storeActiveContact: (id) => dispatch(setActiveContact(id))
    }
}

export default connect(null, mapDispatchToProps)(ConversationHeader);
