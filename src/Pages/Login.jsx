import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext'
import { loginUser } from '../Context/AuthActions'

const FlexContainer = styled.div`
	width: 100%;
	height: 90vh;
	display: flex;
	justify-content: center;
	padding: 100px 0;
	background: #fff;
`;

const FieldsContainer = styled.div`
	max-width: 300px;
	& .ant-input-prefix {
		margin-right: 10px;
	}
`;

const LoginButton = styled(Button)`
	width: 100%;
	margin: 10px 0;
`;

const HelperText = styled.div`
	font-size: 12px;
	color: ${({ type }) => type === 'error' ? 'red' : '#00000073'};
    min-height: 20px;
    margin: 5px 0;
`;

const Login = ({ history }) => {
	const [mobileNumber, setMobileNumber] = useState('');
	const [helperType, setHelperType] = useState('');

    const { setUserContext } = useContext(AuthContext);

	const handleChange = (e) => {
		const { value } = e.target;
		const regEx = /^[789](\d*)?$/;
		if ((!Number.isNaN(value) && regEx.test(value)) || value === '') {
			setMobileNumber(value);
		}
	};

	const handleLogin = () => {
		if (mobileNumber && mobileNumber.toString().length === 10) {
			setHelperType('');

			// login user
			loginUser(mobileNumber, setUserContext);
		} else {
			setHelperType('error');
		}
	};

	const handleKeydown = (e) => {
		if (e && e.key === 'Enter') {
			handleLogin();
		}
	};

	return (
		<FlexContainer>
			<FieldsContainer>
				<Input
					placeholder='Mobile number'
					value={mobileNumber}
					onChange={handleChange}
					onKeyDown={handleKeydown}
					maxLength={10}
					prefix={<UserOutlined className='site-form-item-icon' />}
				/>
				<HelperText type={helperType}>Mobile number should be 10 digits!</HelperText>

				<LoginButton type='primary' onClick={handleLogin}>
					Log in
				</LoginButton>
			</FieldsContainer>
		</FlexContainer>
	);
};


export default Login;
