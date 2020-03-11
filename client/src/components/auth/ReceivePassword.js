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
import { receivePassword } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

const ReceivePassword = ({ receivePassword, error, clearErrors, match }) => {

  const [modal, setModal] = useState(true);
  const [enterPassword, setEnterPassword] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [alertColor, setAlertColor] = useState(null);

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'CHANGE_PASSWORD_FAIL') {
      setMsg(error.msg.msg);
      setAlertColor("danger");
      clearErrors();
    }
  }, [error, clearErrors]);


  const toggle = () => {
    setMsg(null);
    setModal(!modal);
  };

  const onChange = e => {
    setEnterPassword({
      ...enterPassword,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { newPassword, confirmNewPassword } = enterPassword;
    const newUser = {
      newPassword,
      confirmNewPassword
    }
    const { params: { id, token } } = match;

    if (error.id === null) {
      setMsg('Password changed');
      setAlertColor("success");
    }

    // Add content via receivePassword action
    receivePassword(id, token, newUser);
  }


  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Zmień hasło</ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color={alertColor}>{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="newPassword">New password</Label>
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Insert new password..."
                onChange={onChange}
              />

              <Label for="confirmNewPassword"> Confirm new password</Label>
              <Input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Confirm new password..."
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Change password
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <NavLink style={{ textAlign: "center" }} tag={RRNavLink} to={`/admin`}
          target={"_top"}
        >Back to login site</NavLink>
      </Modal>

    </div>
  );
}


ReceivePassword.propTypes = {
  receivePassword: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { receivePassword, clearErrors })(ReceivePassword);