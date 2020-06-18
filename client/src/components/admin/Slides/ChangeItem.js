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
import { deleteSlide, updateSlide } from '../../../actions/slideActions';
import PropTypes from 'prop-types';

const ChangeItem = ({ 
  deleteSlide, updateSlide, 
  slide: {
    _id, files_id, src, header, caption
  }
}) => {
  const [modal, setModal] = useState(false);
  const [slide, setSlide] = useState({
    header: header,
    caption: caption
  });

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    const { name, value } = e.target;

    setSlide(prev => ({
      ...prev, [name]: value
    }));
  };

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();

      // Update photo via addnewSlide action
      updateSlide(id, slide);

      // Close modal
      toggle();
    }
  };


  const onDeleteClick = id => {
    deleteSlide(id);
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
  Change slide description
</Button>

<Modal
  isOpen={modal}
  toggle={toggle}
>
  <ModalHeader toggle={toggle}>Image description</ModalHeader>
  <ModalBody>

    <Form onSubmit={onSubmit(_id)}>
      <FormGroup>
        <Label for="header">Header</Label>
        <Input
          type="text"
          name="header" id="header" placeholder="Add slide header..."
          defaultValue={header}
          onChange={onChange}
        />
        <Label for="caption">Caption</Label>
        <Input
          type="text"
          name="caption" id="caption" placeholder="Add slide caption..."
          defaultValue={caption}
          className="mb-3"
          onChange={onChange}
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
  onClick={toggle}
/>
<CardBody style={{ padding: "0", textAlign: "center" }}>
  <CardText>
    <strong>{header}</strong> <br></br>
    <small className="text-muted">{caption}</small>
  </CardText>
</CardBody>
</Card> 
  )
}

ChangeItem.propTypes = {
  deleteSlide: PropTypes.func.isRequired,
  updateSlide: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  slides: state.slide.slides
});

export default connect(
  mapStateToProps,
  { deleteSlide, updateSlide }
)(ChangeItem)
















