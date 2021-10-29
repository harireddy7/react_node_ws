import { Skeleton, Space } from 'antd';
import styled from 'styled-components';

const SkeletonButton = styled(Skeleton.Button)`
	width: 100%;
	& > span {
		display: block;
		width: 100% !important;
		margin: 0 auto 1px;
	}
`
const StyledSpace = styled(Space)`
	padding: 5px;
`

const SkeletonInput = styled(Skeleton.Input)`
	width: 140px;
`

const mockContacts = Array(7).fill(7);

const SkeletonActive = () => {
	return (
        <StyledSpace>
            <Skeleton.Avatar active size='large' />
            <SkeletonInput active size='large' />
        </StyledSpace>
	);
};

export default SkeletonActive;
