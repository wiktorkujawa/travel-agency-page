import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addAnnouncement } from '../../../actions/announcementActions';

const AnnouncementModal = ({ addAnnouncement }) => {

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
      >Dodaj ogłoszenie
          </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Dodaj do listy ogłoszeń</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Nagłówek</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Dodaj nagłówek"
                onChange={onChange}
              />
              <Label for="content">Zawartość</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                placeholder="Dodaj zawartość ogłoszenia"
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Dodaj ogłoszenie
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  announcement: state.announcement
});

export default connect(mapStateToProps, { addAnnouncement })(AnnouncementModal);