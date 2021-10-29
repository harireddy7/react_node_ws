import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Text from 'antd/lib/typography/Text';

const AvatarName = ({ name, avatar }) => {
    return (
        <Space size='large' align='center'>
            <Avatar src={`https://joeschmoe.io/api/v1/${avatar}`} size={50} />
            <Text level={3}>{name}</Text>
        </Space>
    )
}

export default AvatarName;
