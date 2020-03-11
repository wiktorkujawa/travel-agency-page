import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPhoto } from '../../../actions/galleryActions';

const GalleryModal = ({ addPhoto }) => {

  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [photoData, setPhotoData] = useState({
    description: '',
    tripLocation: ''
  })

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeFile = e => {
    setFileData(e.target.files);
  };

  const onChangeText = e => {
    setPhotoData({
      ...photoData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    const newPhoto = new FormData();

    for (const key of Object.keys(fileData)) {
      newPhoto.append('photo', fileData[key])
    }

    const { description, tripLocation } = photoData;

    newPhoto.append('description', description);
    newPhoto.append('tripLocation', tripLocation);


    addPhoto(newPhoto);

    setFileData(null);

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
      >Add photos
        </Button>


      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add photos to gallery</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="tripLocation">Location</Label>
              <Input
                type="text"
                name="tripLocation"
                id="tripLocation"
                placeholder="Add photo location..."
                onChange={onChangeText}
              />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Describe the photo..."
                onChange={onChangeText}
              />
            </FormGroup>
            <CustomInput
              type="file"
              name="photo"
              id="photo"
              multiple
              label="Add photo/photos..."
              onChange={onChangeFile}
            />


            <Button
              color="dark"
              disabled={fileData === null}
              style={{ marginTop: '2rem' }}
              block>
              Add Photo
                </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(mapStateToProps, { addPhoto })(GalleryModal);