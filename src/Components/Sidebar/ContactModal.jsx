import { useContext, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal, Button, Input } from 'antd';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { createNewContact } from '../../redux/actions/contacts';
import { AuthContext } from '../../Context/AuthContext';

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	z-index: 9999;
`;

const TextInput = styled(Input)`
    // margin: 10px 0;
    padding: 10px;
`

const HelperText = styled.div`
	font-size: 12px;
	color: ${({ type }) => type === 'error' ? 'red' : '#00000073'};
    min-height: 20px;
    margin: 5px 0 15px;
`;

const ContactModal = ({ visible, setVisible, addContactState, createContact }) => {
	const { loading, error, done } = addContactState;

	const { user: { _id } } = useContext(AuthContext);

    const [helperObj, setHelperObj] = useReducer((state, newState) => ({ ...state, ...newState }), { name: '', mobile: '' });
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), { name: '', mobile: '' });

	useEffect(() => {
		if (done) {
			setVisible(false);
		}
	}, [done])

    if (!visible) return null;

	const handleCancel = () => {
		setVisible(false);
	};

	const handleOk = () => {
		// make add contact api call
		// close modal when contact is added & show loading spinner under button
    };

    // Input hanlders
    const handleChange = (e, type) => {
        const { value } = e.target;
        if (type === 'name') {
            const nameRegex = /^[a-z0-9 ]+$/ig;
            if (nameRegex.test(value) || value === '') {
                setState({ name: value });
            }
        } else if (type === 'mobile') {
            const mobileRegex = /^[789](\d*)?$/;
            if ((!Number.isNaN(value) && mobileRegex.test(value)) || value === '') {
                setState({ mobile: value });
            }
        }
	};

	const handleAddContact = () => {
        const { name, mobile } = state;
        if (name && name.length > 0 && name.length <= 20) {
            setHelperObj({ name: '' });
        } else {
            setHelperObj({ name: 'error' })
        }
    
        if (mobile && mobile.length === 10) {
            setHelperObj({ mobile: '' });
        } else {
            setHelperObj({ mobile: 'error' });
        }

        if (name && name.length > 0 && name.length <= 20 && mobile && mobile.length === 10) {
			console.log({name: name.trim(), mobile});
			createContact({ id: _id, name: name.trim(), mobile });
        }
	};

	const handleKeydown = (e) => {
		if (e && e.key === 'Enter') {
			handleAddContact();
		}
	};


	return (
		<ModalContainer>
			<Modal
				visible={visible}
				mask={false}
				title='Add new contact'
				onCancel={handleCancel}
				footer={[
					<Button key='cancel' onClick={handleCancel} disabled={loading}>
						Cancel
					</Button>,
					<Button
						key='submit'
						type='primary'
						loading={loading}
						onClick={handleAddContact}
					>
						Add Contact
					</Button>,
				]}
			>
				<TextInput
					placeholder='Name'
					value={state.name}
					onChange={e => handleChange(e, 'name')}
                    onKeyDown={handleKeydown}
                    minLength={1}
					maxLength={20}
					prefix={<UserOutlined />}
				/>
                <HelperText type={helperObj.name}>Name should be 20 characters!</HelperText>
				<TextInput
					placeholder='Mobile number'
					value={state.mobile}
					onChange={e => handleChange(e, 'mobile')}
					onKeyDown={handleKeydown}
					maxLength={10}
					prefix={<PhoneOutlined />}
				/>
				<HelperText type={helperObj.mobile}>Mobile number should be 10 digits!</HelperText>

				{error && <HelperText type='error'>{error}</HelperText>}
			</Modal>
		</ModalContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		addContactState: state.contacts.addContact,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createContact: (data) => dispatch(createNewContact(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactModal);
