import React, { useEffect, useState } from 'react';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Card, CardImg, CardBody,
  CardText, CardGroup, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { deletePhoto, updatePhoto, getPhotos } from '../../actions/galleryActions';
import PropTypes from 'prop-types';

const GalleryPage = ({ deletePhoto, photos, updatePhoto, getPhotos }) => {

  const [photoDescription, setPhotoDescription] = useState({});

  const [modal, setModal] = useState({});


  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useEffect(() => {
    const createArray = () => {
      const newNames = photos.map(photo => photo);
      setPhotoDescription({ ...newNames });
      const newBools = photos.map(photo => false);
      setModal({ ...newBools });
    };
    createArray();
  }, [photos]);


  const onChange = (photo, index) => {
    return (event) => {
      const { name, value } = event.target;
      setPhotoDescription(prevObjs => ({ ...prevObjs, [index]: { ...photo[index], [name]: value } }));
    }
  }


  const toggle = (index) => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
    }
  };

  const onSubmit = (photoDescription, index, id) => {
    return (event) => {
      event.preventDefault();

      const { description, tripLocation } = photoDescription[index];
      const newPhoto = { description, tripLocation };

      // Update photo via addPhoto action
      updatePhoto(id, newPhoto);

      // Close modal
      toggle(index);
    }
  };

  const onDeleteClick = id => {
    deletePhoto(id);
  };



  return (
    <CardGroup>
      {!(Array.isArray(photos) && photos.length) ?
        <Card className="mt-5 mb-5">
          <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>Temporary no photos</CardBody>
        </Card>
        :
        photos.map(({ _id, files_id, image, tripLocation, description }, index) => (

          <Col style={{ padding: "0" }}
            key={files_id}
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >

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
                onClick={toggle(index)}
              >
                Change photo description
              </Button>

              <Modal
                isOpen={modal[index]}
                toggle={toggle(index)}
              >
                <ModalHeader toggle={toggle(index)}>Photo description</ModalHeader>
                <ModalBody>

                  <Form onSubmit={onSubmit(photoDescription, index, _id)}>
                    <FormGroup>
                      <Label for="tripLocation">Location</Label>
                      <Input
                        type="text"
                        name="tripLocation"
                        id="tripLocation"
                        defaultValue={tripLocation}
                        placeholder="Add photo location..."
                        onChange={onChange(photoDescription, index)}
                      />
                      <Label for="description">Photo description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Describe the photo..."
                        defaultValue={description}
                        className="mb-3"
                        onChange={onChange(photoDescription, index)}
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
                onClick={toggle(index)}
              />
              <CardBody style={{ padding: "0", textAlign: "center" }}>
                <CardText>
                  <strong>{tripLocation}</strong> <br></br>
                  <small className="text-muted">{description}</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}

    </CardGroup>
  );
}



GalleryPage.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { deletePhoto, updatePhoto, getPhotos }
)(GalleryPage);