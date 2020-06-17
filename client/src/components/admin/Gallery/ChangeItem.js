import React, { useState } from 'react';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Card, CardImg, CardBody, CardText
} from 'reactstrap';
import { connect } from 'react-redux';
import { deletePhoto, updatePhoto } from '../../../actions/galleryActions';
import PropTypes from 'prop-types';

const ChangeItem = ({ 
  deletePhoto, updatePhoto, 
  photo: {
    _id, files_id, image, tripLocation, description
  }
}) => {
  const [modal, setModal] = useState(false);
  const [photoDescription, setPhotoDescription] = useState({
    tripLocation: tripLocation,
    description: description
  });

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    const { name, value } = e.target;

    setPhotoDescription(prev => ({
      ...prev, [name]: value
    }));
  };

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();

      // Update photo via addPhoto action
      updatePhoto(id, photoDescription);
      // Close modal
      toggle();
    }
  };

  const onDeleteClick = id => {
    deletePhoto(id);
  };

  return (
    <Card>
              <Button
                style={{
                  position: "absolute",
                  left: "100%",
                  marginLeft: "-1.5rem",
                  marginTop: "-0.1rem",
                  zIndex: "1000"
                }}
                color="danger"
                size="sm"

                onClick={onDeleteClick.bind(this, files_id)}
              >&times;
              </Button>
              <Button
                className="slide-modify"
                style={{ marginLeft: "-4rem", top: "25%" }}
                color="info"
                size="md"
                onClick={toggle}
              >
                Change photo description
              </Button>

              <Modal
                isOpen={modal}
                toggle={toggle}
              >
                <ModalHeader toggle={toggle}>Photo description</ModalHeader>
                <ModalBody>

                  <Form onSubmit={onSubmit(_id)}>
                    <FormGroup>
                      <Label for="tripLocation">Location</Label>
                      <Input
                        type="text"
                        name="tripLocation"
                        id="tripLocation"
                        defaultValue={tripLocation}
                        placeholder="Add photo location..."
                        onChange={onChange}
                      />
                      <Label for="description">Photo description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Describe the photo..."
                        defaultValue={description}
                        className="mb-3"
                        onChange={onChange}
                      />
                    </FormGroup>

                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block>
                      Change photo description
                  </Button>
                  </Form>
                </ModalBody>
              </Modal>

              <CardImg top src={image}
                height="200"
                onClick={toggle}
              />
              <CardBody style={{ padding: "0", textAlign: "center" }}>
                <CardText>
                  <strong>{tripLocation}</strong> <br></br>
                  <small className="text-muted">{description}</small>
                </CardText>
              </CardBody>
            </Card>
  )
}

ChangeItem.propTypes = {
  deletePhoto: PropTypes.func.isRequired,
  updatePhoto: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos
});

export default connect(
  mapStateToProps,
  { deletePhoto, updatePhoto }
)(ChangeItem)
