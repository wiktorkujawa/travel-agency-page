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
  CustomInput,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { addOffer } from '../actions/offerActions';

const OfferModal = ({ addOffer }) => {

  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [offerData, setOfferData] = useState({
    title: '',
    departureDate: '',
    departureTime: '',
    price: '',
    tripLocation: '',
    type: 'individual',
    description: ''
  })


  const toggle = () => {
    setModal(!modal);
  };

  const onChangeFile = e => {
    setFileData(e.target.files[0]);
  };

  const onChangeText = e => {
    setOfferData({
      ...offerData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    const newOffer = new FormData();
    newOffer.append('offer', fileData);

    const { departureDate, departureTime, price, tripLocation, type, description, title } = offerData;
    newOffer.append('title', title);
    newOffer.append('departureDate', departureDate);
    newOffer.append('departureTime', departureTime);
    newOffer.append('price', price);
    newOffer.append('tripLocation', tripLocation);
    newOffer.append('type', type);
    newOffer.append('description', description);


    addOffer(newOffer);

    setFileData(null);

    // Close modal
    toggle();
  }
  return (
    <div style={{ position: "relative" }}>
      <Button
        className="add-item"
        color="info"
        size="lg"
        style={{ zIndex: "1000" }}
        onClick={toggle}
      >+
        </Button>

      <Modal
        className="open-offer-modal"
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <ModalHeader toggle={toggle}>Add offer</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="departureDate">Departure date</Label>
              <Input
                type="date"
                name="departureDate"
                id="departureDate"
                placeholder="Add departure date..."
                onChange={onChangeText}
              />
              <Label for="departureTime">Departure hour</Label>
              <Input
                type="text"
                name="departureTime"
                id="departureTime"
                placeholder="Add departure hour..."
                onChange={onChangeText}
              />
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="Add price..."
                onChange={onChangeText}
              />
              <Label for="tripLocation">Trip location</Label>
              <Input
                type="text"
                name="tripLocation"
                id="tripLocation"
                placeholder="Add trip location..."
                onChange={onChangeText}
              />
            </FormGroup>


            <FormGroup tag="fieldset">
              <legend>Offer type</legend>
              <Row style={{ justifyContent: "space-evenly" }}>
                <FormGroup check  >
                  <Label check for="type1">
                    <Input
                      checked={offerData.type === "individual"}
                      type="radio"
                      name="type"
                      id="type1"
                      value="individual"
                      onChange={onChangeText}
                    />
                    Individual
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type2">
                    <Input
                      checked={offerData.type === "bussiness-trips"}
                      type="radio"
                      name="type"
                      id="type2"
                      value="bussiness-trips"
                      onChange={onChangeText}
                    />
                    Bussiness trips
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type3">
                    <Input
                      checked={offerData.type === "field-trips"}
                      type="radio"
                      name="type"
                      id="type3"
                      value="field-trips"
                      onChange={onChangeText}
                    />
                    Field trips
              </Label>
                </FormGroup>
              </Row>
              <Row style={{ justifyContent: "space-evenly" }}>
                <FormGroup check >
                  <Label check for="type4">
                    <Input
                      checked={offerData.type === "school-trips"}
                      type="radio"
                      name="type"
                      id="type4"
                      value="school-trips"
                      onChange={onChangeText}
                    />
                    School trips
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type5">
                    <Input
                      checked={offerData.type === "pilgrims"}
                      type="radio"
                      name="type"
                      id="type5"
                      value="pilgrims"
                      onChange={onChangeText}
                    />
                    Pilgrims
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type6">
                    <Input
                      checked={offerData.type === "summer-camps"}
                      type="radio"
                      name="type"
                      id="type6"
                      value="summer-camps"
                      onChange={onChangeText}
                    />
                    Summer camps
              </Label>
                </FormGroup>
              </Row>
            </FormGroup>
            <Label for="title">Offer title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Name the offer..."
              className="mb-3"
              onChange={onChangeText}
            />
            <Label for="description">Offer description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Describe the offer..."
              className="mb-3"
              onChange={onChangeText}
            />
            <CustomInput
              type="file"
              name="offer"
              id="offer"
              label="Choose offer image..."
              onChange={onChangeFile}
            />


            <Button
              color="dark"
              disabled={fileData === null}
              style={{ marginTop: '2rem' }}
              block>
              Add offer
                </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  offer: state.offer
});

export default connect(mapStateToProps, { addOffer })(OfferModal);