import React, { useState } from 'react';
import {
  Button, Form,
  FormGroup, Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addAnnouncement } from '../../../actions/announcementActions';

const AddAnnouncement = ({ addAnnouncement }) => {

  const [modal, setModal] = useState(false);
  const [announcementName, setAnnouncementName] = useState({
    name: '',
    content: ''
  });


  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setAnnouncementName({
      ...announcementName,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, content } = announcementName;

    const newAnnouncement = {
      name,
      content
    }

    // Add announcement via addAnnouncement action
    addAnnouncement(newAnnouncement);

    // Close modal
    toggle();
  }
  return (
    <div>
      <Button
        color="info"
        size="md"
        onClick={toggle}
        style={{ zIndex: "1000" }}
      >Add announcement
          </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add to announcement list</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Header</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Add header..."
                onChange={onChange}
              />
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                placeholder="Add content..."
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Add announcement
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements
});

export default connect(
    mapStateToProps,
    { addAnnouncement })(AddAnnouncement)