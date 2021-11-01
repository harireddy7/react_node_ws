import TextArea from 'antd/lib/input/TextArea';
import SendOutlined from '@ant-design/icons/SendOutlined';
import styled from 'styled-components';
import { Button } from 'antd';

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

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
    &:focus, &:hover, &:active {
        border: none;
    }
`

const SendMessageButton = styled(Button)`
    border: none;
    padding: 5px;
    background: transparent;
    border-radius: 50%;
    & svg {
        font-size: 22px;
    }
    &:focus, &:hover {
        background: #eef0ed;
    }
`

const ConversationInput = () => {
    return (
        <FlexContainer>
            <MessageArea
                placeholder="Send a message..."
                autoSize={{ minRows: 1, maxRows: 2 }}
            />
            <SendMessageButton icon={<SendOutlined />} />
        </FlexContainer>
    )
}

export default ConversationInput;
