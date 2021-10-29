import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
    position: initial;
`

const AvatarName = ({ name, avatar }) => {
    return (
        <Space size='large' align='center'>
            <StyledAvatar src={`https://joeschmoe.io/api/v1/${avatar}`} size={50} />
            <Text level={3}>{name}</Text>
        </Space>
    )
}

export default AvatarName;
