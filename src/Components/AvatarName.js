import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
    width: 100%;
    cursor: pointer;
    & .ant-space-item:nth-child(2) {
        width: 100%;
    }
`

const StyledAvatar = styled(Avatar)`
    position: initial;
`

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    & > span:first-child {
        line-height: 20px;
    }
    & > span:last-child {
        line-height: 2;
    }
`

const AvatarName = ({ name, description, avatar, space = 'large' }) => {
    return (
        <StyledSpace size={space} align='center'>
            <StyledAvatar src={avatar} size={50} />
            <StyledContent>
                <Text level={3}>{name}</Text>
                <Text type='secondary'>{description}</Text>
            </StyledContent>
        </StyledSpace>
    )
}

export default AvatarName;
