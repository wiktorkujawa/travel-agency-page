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
    arrivalDate: '',
    arrivalTime: '',
    price: '',
    tripLocation: '',
    type: 'indywidualne-i-rodzinne',
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

    const { arrivalDate, arrivalTime, price, tripLocation, type, description, title } = offerData;
    newOffer.append('title', title);
    newOffer.append('arrivalDate', arrivalDate);
    newOffer.append('arrivalTime', arrivalTime);
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
        <ModalHeader toggle={toggle}>Dodaj ofertę</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="arrivalDate">Data wyjazdu</Label>
              <Input
                type="date"
                name="arrivalDate"
                id="arrivalDate"
                placeholder="Dodaj datę wyjazdu..."
                onChange={onChangeText}
              />
              <Label for="arrivalTime">Godzina wyjazdu</Label>
              <Input
                type="text"
                name="arrivalTime"
                id="arrivalTime"
                placeholder="Dodaj godzinę wyjazdu..."
                onChange={onChangeText}
              />
              <Label for="price">Cena</Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="Wstaw cenę..."
                onChange={onChangeText}
              />
              <Label for="tripLocation">Lokalizacja</Label>
              <Input
                type="text"
                name="tripLocation"
                id="tripLocation"
                placeholder="Dodaj lokalizację..."
                onChange={onChangeText}
              />
            </FormGroup>


            <FormGroup tag="fieldset">
              <legend>Typ oferty</legend>
              <Row style={{ justifyContent: "space-evenly" }}>
                <FormGroup check  >
                  <Label check for="type1">
                    <Input
                      checked={offerData.type === "indywidualne-i-rodzinne"}
                      type="radio"
                      name="type"
                      id="type1"
                      value="indywidualne-i-rodzinne"
                      onChange={onChangeText}
                    />
                    Indywidualne i rodzinne
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type2">
                    <Input
                      checked={offerData.type === "firmowe"}
                      type="radio"
                      name="type"
                      id="type2"
                      value="firmowe"
                      onChange={onChangeText}
                    />
                    Firmowe
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type3">
                    <Input
                      checked={offerData.type === "zielone-szkoly"}
                      type="radio"
                      name="type"
                      id="type3"
                      value="zielone-szkoly"
                      onChange={onChangeText}
                    />
                    Zielone szkoły
              </Label>
                </FormGroup>
              </Row>
              <Row style={{ justifyContent: "space-evenly" }}>
                <FormGroup check >
                  <Label check for="type4">
                    <Input
                      checked={offerData.type === "wycieczki-szkolne"}
                      type="radio"
                      name="type"
                      id="type4"
                      value="wycieczki-szkolne"
                      onChange={onChangeText}
                    />
                    Wycieczki szkolne
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type5">
                    <Input
                      checked={offerData.type === "pielgrzymki"}
                      type="radio"
                      name="type"
                      id="type5"
                      value="pielgrzymki"
                      onChange={onChangeText}
                    />
                    Pielgrzymki
              </Label>
                </FormGroup>
                <FormGroup check >
                  <Label check for="type6">
                    <Input
                      checked={offerData.type === "kolonie-i-obozy"}
                      type="radio"
                      name="type"
                      id="type6"
                      value="kolonie-i-obozy"
                      onChange={onChangeText}
                    />
                    Kolonie i obozy
              </Label>
                </FormGroup>
              </Row>
            </FormGroup>
            <Label for="title">Tytuł oferty</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Name the offer..."
              className="mb-3"
              onChange={onChangeText}
            />
            <Label for="description">Opis oferty</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Opisz ofertę..."
              className="mb-3"
              onChange={onChangeText}
            />
            <CustomInput
              type="file"
              name="offer"
              id="offer"
              label="Wybierz obrazek opisujący ofertę..."
              onChange={onChangeFile}
            />


            <Button
              color="dark"
              disabled={fileData === null}
              style={{ marginTop: '2rem' }}
              block>
              Dodaj ofertę
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