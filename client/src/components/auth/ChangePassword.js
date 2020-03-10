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
import { changePassword } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

const ChangePassword = ({ user, changePassword, error, clearErrors }) => {

  const [modal, setModal] = useState(false);
  const [enterPassword, setEnterPassword] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [alertColor, setAlertColor] = useState(null);
  const [takeEmail, setTakeEmail] = useState(null);

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'CHANGE_PASSWORD_FAIL') {
      setMsg(error.msg.msg);
      setAlertColor("danger");
      clearErrors();
    }
  }, [error, clearErrors]);

  useEffect(() => {
    const createArray = () => {
      setTakeEmail({ email: user.email });
    };
    createArray();
  }, [user]);

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
    const { email } = takeEmail;
    const { oldPassword, newPassword } = enterPassword;
    const newUser = {
      email,
      oldPassword,
      newPassword
    }

    if (error.id === null) {
      setMsg('Hasło zmienione');
      setAlertColor("success");
    }

    // Add content via changePassword action
    changePassword(newUser);
  }


  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Zmień hasło
        </NavLink>

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="open-modal"
      >
        <ModalHeader toggle={toggle}>Zmień hasło</ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color={alertColor}>{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="oldPassword">Aktualne hasło</Label>
              <Input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Wprowadź stare hasło..."
                onChange={onChange}
              />

              <Label for="newPassword">Nowe hasło</Label>
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Wprowadź nowe hasło..."
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Zmień hasło
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}


ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { changePassword, clearErrors })(ChangePassword);