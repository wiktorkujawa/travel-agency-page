import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import {
  NavLink as RRNavLink,
  Redirect
} from 'react-router-dom';
const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {

  const [modal, setModal] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [msg, setMsg] = useState(null);

  const toggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    }
    else
      setMsg(null);
    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, toggle, isAuthenticated, modal]);





  const onChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = loginData;
    const user = {
      email,
      password
    }

    // Attempt to login
    login(user);
  };

  return (
    <div>
      {!isAuthenticated ?
        <Modal
          className="open-offer-modal"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>Login</ModalHeader>
          <ModalBody>
            {msg ? (
              <Alert color="danger">{msg}</Alert>
            ) : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Podaj adres email..."
                  className="mb-3"
                  onChange={onChange}
                />

                <Label for="password">Hasło</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Wprowadż hasło..."
                  className="mb-3"
                  onChange={onChange}
                />

                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <NavLink style={{ textAlign: "center" }} tag={RRNavLink} to={`/admin/reset_password`}
            target={"_top"}
          >Zapomniałeś hasła? Kliknij tutaj, aby odzyskać hasło.</NavLink>
        </Modal>
        : <Redirect to="/admin-modal" />
      }
    </div>
  );
}
LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});


export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);