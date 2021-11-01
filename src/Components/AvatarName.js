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

const AvatarName = ({ name, avatar, space = 'large' }) => {
    return (
        <StyledSpace size={space} align='center'>
            <StyledAvatar src={avatar} size={50} />
            <Text level={3}>{name}</Text>
        </StyledSpace>
    )
}

export default AvatarName;
