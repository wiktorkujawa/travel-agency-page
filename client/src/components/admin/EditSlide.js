import React, { useState, useEffect } from 'react';
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
import { getSlides, deleteSlide, updateSlide } from '../../actions/slideActions';
import PropTypes from 'prop-types';

const EditSlide = ({ getSlides, deleteSlide, updateSlide, slides }) => {

  const [slideDescription, setSlideDescription] = useState({});
  const [modal, setModal] = useState({});

  useEffect(() => {
    getSlides();
  }, [getSlides]);

  useEffect(() => {
    const createArray = () => {
      const newNames = slides.map(offer => offer);
      setSlideDescription({ ...newNames });
      const newBools = slides.map(offer => false);
      setModal({ ...newBools });
    };
    createArray();
  }, [slides]);


  //Events functions
  const onChange = (slide, index) => {
    return (event) => {
      const { name, value } = event.target;
      setSlideDescription(prevObjs => ({ ...prevObjs, [index]: { ...slide[index], [name]: value } }));
    }
  }

  const toggle = (index) => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
    }
  };

  const onSubmit = (slideDescription, index, id) => {
    return (event) => {
      event.preventDefault();

      const { header, caption } = slideDescription[index];
      const newSlide = { header, caption };

      // Update photo via addnewSlide action
      updateSlide(id, newSlide);

      // Close modal
      toggle(index);
    }
  };


  const onDeleteClick = id => {
    deleteSlide(id)
  };

  return (
    <CardGroup>
      {!(Array.isArray(slides) && slides.length) ?
        <Card className="mt-5 mb-5">
          <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>Temporary no slides</CardBody>
        </Card>
        :
        slides.map(({ _id, files_id, src, header, caption }, index) => (

          <Col style={{ padding: "0" }}
            key={files_id}
            sm="6"
            lg="4"
            xl="3"
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
                Change slide description
              </Button>

              <Modal
                isOpen={modal[index]}
                toggle={toggle(index)}
              >
                <ModalHeader toggle={toggle(index)}>Image description</ModalHeader>
                <ModalBody>

                  <Form onSubmit={onSubmit(slideDescription, index, _id)}>
                    <FormGroup>
                      <Label for="header">Header</Label>
                      <Input
                        type="text"
                        name="header"
                        id="header"
                        defaultValue={header}
                        placeholder="Add slide header..."
                        onChange={onChange(slideDescription, index)}
                      />
                      <Label for="caption">Caption</Label>
                      <Input
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder="Add slide caption..."
                        defaultValue={caption}
                        className="mb-3"
                        onChange={onChange(slideDescription, index)}
                      />
                    </FormGroup>

                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block>
                      Change slide description
                  </Button>
                  </Form>
                </ModalBody>
              </Modal>

              <CardImg top src={src}
                height="300"
                onClick={toggle(index)}
              />
              <CardBody style={{ padding: "0", textAlign: "center" }}>
                <CardText>
                  <strong>{header}</strong> <br></br>
                  <small className="text-muted">{caption}</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}

    </CardGroup>
  );
}

EditSlide.propTypes = {
  getSlides: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  slides: state.slide.slides
});

export default connect(
  mapStateToProps,
  { getSlides, deleteSlide, updateSlide }
)(EditSlide);