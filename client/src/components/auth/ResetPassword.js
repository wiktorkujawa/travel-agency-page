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
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

const ResetPassword = ({ resetPassword, error, clearErrors }) => {

  const [takeEmail, setTakeEmail] = useState(null);
  const [modal, setModal] = useState(true);

  const [msg, setMsg] = useState(null);
  const [alertColor, setAlertColor] = useState(null);

  useEffect(() => {
    if (error.id === 'RESET_PASSWORD_FAIL') {
      setMsg(error.msg.msg);
      setAlertColor("danger");
      clearErrors();
    }
  }, [error, clearErrors]);


  const onChange = e => {
    setTakeEmail({
      ...takeEmail,
      [e.target.name]: e.target.value
    });
  };

  const toggle = () => {
    // Clear errors
    clearErrors();
    setModal(!modal)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email } = takeEmail;

    const sendEmail = {
      email
    };
    if (error.id === null) {
      setMsg('Action successfull, check your email address to change password');
      setAlertColor("success");
    }

    // Add content via resetPassword action
    resetPassword(sendEmail);
  }


  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color={alertColor}>{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Insert email..."
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
      </Modal>
    </div>
  );
}


ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(ResetPassword);