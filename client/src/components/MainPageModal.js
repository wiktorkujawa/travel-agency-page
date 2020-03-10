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
import { addSlide } from '../actions/slideActions';
import PropTypes from 'prop-types';

const MainPageModal = ({ isAuthenticated, addSlide }) => {

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
      {isAuthenticated ?

        <Button
          className="slide-modify"
          style={{ marginLeft: "-3rem" }}
          color="info"
          size="lg"
          onClick={toggle}
        >+
        </Button>
        : null
      }

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="open-offer-modal"
      >
        <ModalHeader toggle={toggle}>Dodaj nowe slajdy</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>

              <Label for="header">Nagłówek</Label>
              <Input
                type="text"
                name="header"
                id="header"
                placeholder="Dodaj nagłówek slajdu..."
                className="mb-3"
                onChange={onChangeText}
              />
              <Label for="caption">Podpis</Label>
              <Input
                type="text"
                name="caption"
                id="caption"
                placeholder="Dodaj podpis slajdu"
                className="mb-3"
                onChange={onChangeText}
              />

              <CustomInput
                type="file"
                name="slide"
                id="slide"
                label="Dodaj obrazek slajdu..."
                onChange={onChangeImage}
              />

              <Button
                color="dark"
                disabled={imageData === null}
                style={{ marginTop: '2rem' }}
                block>
                Dodaj slajd
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

MainPageModal.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  slide: state.slide,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addSlide })(MainPageModal);