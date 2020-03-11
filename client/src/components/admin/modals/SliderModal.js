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
import { addSlide } from '../../../actions/slideActions';

const SliderModal = ({ addSlide }) => {

  const [modal, setModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [slideData, setSlideData] = useState({
    header: '',
    caption: ''
  })


  const toggle = () => {
    setModal(!modal);
  };

  const onChangeImage = e => {
    setImageData(e.target.files[0]);
  };

  const onChangeText = e => {
    setSlideData({
      ...slideData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    const newSlide = new FormData();
    newSlide.append('slide', imageData);

    const { header, caption } = slideData;

    newSlide.append('caption', caption);
    newSlide.append('header', header);

    addSlide(newSlide);

    setImageData(null);

    // Close modal
    toggle();
  }
  return (
    <div>
      <Button
        color="info"
        size="md"
        onClick={toggle}
      >Add slide
        </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add new slides</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>

              <Label for="header">Header</Label>
              <Input
                type="text"
                name="header"
                id="header"
                placeholder="Add header..."
                className="mb-3"
                onChange={onChangeText}
              />
              <Label for="caption">Caption</Label>
              <Input
                type="text"
                name="caption"
                id="caption"
                placeholder="Add caption..."
                className="mb-3"
                onChange={onChangeText}
              />

              <CustomInput
                type="file"
                name="slide"
                id="slide"
                label="Add image..."
                onChange={onChangeImage}
              />

              <Button
                color="dark"
                disabled={imageData === null}
                style={{ marginTop: '2rem' }}
                block>
                Add slide
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  slide: state.slide
});

export default connect(mapStateToProps, { addSlide })(SliderModal);