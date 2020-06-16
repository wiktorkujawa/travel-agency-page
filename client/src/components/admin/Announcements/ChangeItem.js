import React, { useState } from 'react';
import {
  ListGroupItem, Button, Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteAnnouncement, updateAnnouncement } from '../../../actions/announcementActions';
import PropTypes from 'prop-types';

const ChangeItem = ({deleteAnnouncement, updateAnnouncement, announcement: {_id, name, content}}) => {

  const [announcementName, setAnnouncementName] = useState({
    name: name,
    content:content
  });

  const onChange = e => {
    const { name, value } = e.target;

    setAnnouncementName(prev => ({
      ...prev, [name]: value
    }));
  };

  const onDeleteClick = id => {
    deleteAnnouncement(id);
  };

  const onSubmit = id => {
    const { name, content } = announcementName;

    const newAnnouncement = {
      name,
      content
    }
    // Add announcement via addAnnouncement action
    updateAnnouncement(id, newAnnouncement);
  }


  return (
    <div>
      < CSSTransition key={_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
                <Form onSubmit={onSubmit.bind(this, _id)}
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
                      onChange={onChange}
                    />
                    <Label for="content">Content</Label>
                    <Input
                      type="textarea"
                      name="content"
                      id="content"
                      defaultValue={content}
                      placeholder="Add content..."
                      onChange={onChange}
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
    </div>
  )
}

ChangeItem.propTypes = {
  deleteAnnouncement: PropTypes.func.isRequired,
  updateAnnouncement: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements
});

export default connect(
  mapStateToProps,
  { deleteAnnouncement, updateAnnouncement }
)(ChangeItem)
