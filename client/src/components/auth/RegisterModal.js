import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
const RegisterModal = ({ error, register, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [alertColor, setAlertColor] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
      setAlertColor("danger");
      clearErrors();
    }
  }, [error, clearErrors]);

  const toggle = () => {
    setModal(!modal);
    setMsg(null);
  };

  const onChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = registerData;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    register(newUser);
    if (error.id === null) {
      setMsg('User registered');
      setAlertColor("success");
    }
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register user
        </NavLink>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="open-offer-modal"
      >
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color={alertColor}>{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">User name</Label>
              <Input
                type="text"
                name="name" id="name" placeholder="Insert user name..."
                className="mb-3"
                onChange={onChange}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email" id="email" placeholder="Insert email address..."
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password" id="password" placeholder="Insert password..."
                className="mb-3"
                onChange={onChange}
              />

              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >
                Register
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );

}
RegisterModal.propTypes = {
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);