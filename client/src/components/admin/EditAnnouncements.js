import React, { useEffect, useState } from 'react';
import {
  ListGroup, ListGroupItem, Button, Form,
  FormGroup, Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getAnnouncements, deleteAnnouncement, updateAnnouncement, addAnnouncement } from '../../actions/announcementActions';
import PropTypes from 'prop-types';

const ChangeAnnouncements = ({ getAnnouncements, deleteAnnouncement, announcements, updateAnnouncement }) => {

  const [announcementName, setAnnouncementName] = useState({});

  useEffect(() => {
    getAnnouncements()
  }, [getAnnouncements])

  useEffect(() => {
    const createArray = () => {
      const newNames = announcements.map(announcement => announcement);
      setAnnouncementName({ ...newNames });
    };
    createArray();
  }, [announcements]);

  //Events functions
  const onChange = (announcement, index) => {
    return (event) => {
      const { name, value } = event.target;
      setAnnouncementName(prevObjs => ({ ...prevObjs, [index]: { ...announcement[index], [name]: value } }));
    }
  }
  const onDeleteClick = id => {
    deleteAnnouncement(id);
  };

  //rendered elements

  return (
    <ListGroup>
      <TransitionGroup>
        {!(Array.isArray(announcements) && announcements.length) ?
          < CSSTransition timeout={500} classNames="fade" >
            <ListGroupItem style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }} className="content-margin">
              Temporary no announcements
            </ListGroupItem>
          </CSSTransition>
          : announcements.map(({ _id, name, content }, index) => (
            < CSSTransition key={_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
                <Form onSubmit={e => {
                  e.preventDefault();
                  const { name, content } = announcementName[index];
                  const newAnnouncement = {
                    name,
                    content
                  }
                  // Add announcement via addAnnouncement action
                  updateAnnouncement(_id, newAnnouncement);
                }}
                >
                  <FormGroup >
                    <Button
                      style={{
                        position: "absolute",
                        left: "100%",
                        marginLeft: "-2.2rem",
                        marginTop: "-0.8rem"
                      }}
                      color="danger"
                      size="md"

                      onClick={onDeleteClick.bind(this, _id)}
                    >&times;
              </Button>
                    <Label for="name">Header</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={name}
                      placeholder="Add header..."
                      onChange={onChange(announcementName, index)}
                    />
                    <Label for="content">Content</Label>
                    <Input
                      type="textarea"
                      name="content"
                      id="content"
                      defaultValue={content}
                      placeholder="Add content..."
                      onChange={onChange(announcementName, index)}
                    />
                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block>
                      Change announcement
            </Button>
                  </FormGroup>
                </Form>
              </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </ListGroup>
  );
}

ChangeAnnouncements.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired
}

const AddAnnouncements = ({ addAnnouncement }) => {

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

export default {
  AddAnnouncements: connect(
    mapStateToProps,
    { addAnnouncement })
    (AddAnnouncements),
  ChangeAnnouncements: connect(
    mapStateToProps,
    { getAnnouncements, deleteAnnouncement, updateAnnouncement }
  )(ChangeAnnouncements)
}