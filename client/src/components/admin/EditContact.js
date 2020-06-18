import React, { useState, Fragment, useEffect } from 'react';
import {
  Button, Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { getContact, updateContact } from '../../actions/contactActions';
import PropTypes from 'prop-types';
const AppNavbar = ({ getContact, contacts, updateContact }) => {
  const [Contact, setContact] = useState({});

  useEffect(() => {
    getContact();
  }, [getContact])

  useEffect(() => {
    const createArray = () => {
      setContact(...contacts);
    };
    createArray();
  }, [contacts]);


  const onChange = (event) => {
    const { name, value } = event.target;
    setContact(prevObjs => ({ ...prevObjs, [name]: value }));
  }

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();
      const { workTime, email, phoneNumber, address } = Contact;
      const newItem = {
        workTime,
        email,
        phoneNumber,
        address
      }
      // Add content via addItem action
      updateContact(id, newItem);
    }
  }

  return (

    <Fragment>
      {
        contacts.map(({ _id, workTime, email, phoneNumber, address }) => (

          <Form onSubmit={onSubmit(_id)}
          >
            <FormGroup >
              <div className="input-location mt-3" >
                <div >
                  <Label for="contact">Work hours</Label>
                  <Input
                    type="textarea"
                    name="workTime" id="contact" placeholder="Change work hours..."
                    defaultValue={workTime}
                    onChange={onChange}
                  />
                  <Label for="contact">Email</Label>
                  <Input
                    type="textarea"
                    name="email" id="contact" placeholder="Change email address..."
                    defaultValue={email}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <Label for="contact">Phone numbers</Label>
                  <Input
                    type="textarea"
                    name="phoneNumber" id="contact" placeholder="Insert phone numbers..."
                    defaultValue={phoneNumber}
                    onChange={onChange}
                  />
                  <Label for="contact">Office location</Label>
                  <Input
                    type="textarea"
                    name="address" id="contact" placeholder="Insert office location..."
                    defaultValue={address}
                    onChange={onChange}
                  />
                </div>
              </div>
              <Button
                color="dark"
                style={{ maxWidth: "30rem", margin: "0 auto" }}
                block>
                Confirm changes
    </Button>
            </FormGroup>
          </Form>
        ))}
    </Fragment>

  );
}

AppNavbar.propTypes = {
  getContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

export default connect(mapStateToProps,
  { getContact, updateContact }
)(AppNavbar);