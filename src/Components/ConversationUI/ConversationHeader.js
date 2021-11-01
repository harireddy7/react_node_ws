import AvatarName from '../AvatarName';
import MoreOutlined from '@ant-design/icons/MoreOutlined'
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';

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

const ConversationHeader = ({ contact }) => {
    return (
        <FlexContainer>
            <AvatarName name={contact.name} avatar={contact.image} space='small' />
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <MoreOptions icon={<MoreOutlined />} />
            </Dropdown>
        </FlexContainer>
    )
}

export default ConversationHeader;
