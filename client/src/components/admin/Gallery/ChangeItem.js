import React, { useState } from 'react';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Card, CardFooter, CardImg, CardBody,
  CardTitle, Row, CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteOffer, updateOffer } from '../../../actions/offerActions';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const ChangeItem = ({ 
  deleteOffer, updateOffer, 
  offer: {
    _id, files_id, image, title, departureDate, departureTime, price, tripLocation, type, description
  }
}) => {
  const [modal, setModal] = useState(false);
  const [offer, setOffer] = useState({
    title: title, 
    departureDate: departureDate, 
    departureTime: departureTime, 
    price: price, 
    tripLocation: tripLocation, 
    type: type, 
    description: description
  });
  const [fileData, setFileData] = useState(null);

  const sanitizer = dompurify.sanitize;

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    const { name, value } = e.target;

    setOffer(prev => ({
      ...prev, [name]: value
    }));
  };

  const onChangeFile = e => {
    setFileData(e.target.files[0]);
  };

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();
      if (fileData != null) {
        const newOffer = new FormData();
        newOffer.append('offer', fileData);

        const { title, departureDate, departureTime, price, tripLocation, type, description } = offer;

        newOffer.append('title', title);
        newOffer.append('departureDate', departureDate);
        newOffer.append('departureTime', departureTime);
        newOffer.append('price', price);
        newOffer.append('tripLocation', tripLocation);
        newOffer.append('type', type);
        newOffer.append('description', description);

        // Update offer via addOffer action
        updateOffer(id, newOffer);

        setFileData(null);
        // Close modal
        toggle();
      }
      else {
        const { title, departureDate, departureTime, price, tripLocation, type, description } = offer;
        const newOffer = { title, departureDate, departureTime, price, tripLocation, type, description };

        // Update offer via addOffer action
        updateOffer(id, newOffer);
        // Close modal
        toggle();
      }
    }
  }

  const onDeleteClick = id => {
    deleteOffer(id);
  };

  return (
    <Card className="mt-5">
            <Button
              style={{
                position: "absolute", left: "100%", marginLeft: "-1.5rem", marginTop: "-0.1rem", zIndex: "1000"
              }}
              color="danger"
              size="sm"
              onClick={onDeleteClick.bind(this, files_id)}
            >&times;
              </Button>
            <Button
              className="slide-modify" style={{ marginLeft: "-4rem", top: "25%" }}
              color="info" size="md"
              onClick={toggle}
            >
              Change Offer
              </Button>

            <Modal
              isOpen={modal}
              toggle={toggle}
              size="lg"
            >
              <ModalHeader toggle={toggle}>Dane Oferty</ModalHeader>
              <ModalBody>

                <Form onSubmit={onSubmit(files_id)}>
                  <FormGroup>
                    <Label for="departureDate">Data wyjazdu</Label>
                    <Input
                      type="date"
                      name="departureDate" id="departureDate" defaultValue={departureDate}
                      placeholder="Add departure date..."
                      onChange={onChange}
                    />
                    <Label for="Departure time">Deaparture time</Label>
                    <Input
                      type="text"
                      name="departureTime" id="departureTime" defaultValue={departureTime}
                      placeholder="Add departure time..."
                      onChange={onChange}
                    />
                    <Label for="price">Price</Label>
                    <Input
                      type="text"
                      name="price" id="price" defaultValue={price}
                      placeholder="Insert price..."
                      onChange={onChange}
                    />
                    <Label for="tripLocation">Location</Label>
                    <Input
                      type="text"
                      name="tripLocation" id="tripLocation" defaultValue={tripLocation}
                      placeholder="Add trip location..."
                      onChange={onChange}
                    />
                  </FormGroup>


                  <FormGroup tag="fieldset">
                    <legend>Offer type</legend>
                    <Row style={{ justifyContent: "space-evenly" }}>
                      <FormGroup check  >
                        <Label check for="type1">
                          <Input
                            type="radio"
                            name="type" id="type1" value="individual"
                            checked={offer.type === "individual"}
                            onChange={onChange}
                          />
                          Individual
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type2">
                          <Input
                            type="radio"
                            name="type" id="type2" value="bussiness-trips"
                            checked={offer.type === "bussiness-trips"}
                            onChange={onChange}
                          />
                          Bussiness Trips
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type3">
                          <Input
                            type="radio"
                            name="type" id="type3" value="field-trips"
                            checked={offer.type === "field-trips"}
                            onChange={onChange}
                          />
                          Field trips
                      </Label>
                      </FormGroup>
                    </Row>
                    <Row style={{ justifyContent: "space-evenly" }}>
                      <FormGroup check >
                        <Label check for="type4">
                          <Input
                            type="radio"
                            name="type" id="type4" value="school-trips"
                            checked={offer.type === "school-trips"}
                            onChange={onChange}
                          />
                          School trips
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type5">
                          <Input
                            type="radio"
                            name="type" id="type5" value="pilgrims"
                            checked={offer.type === "pilgrims"}
                            onChange={onChange}
                          />
                          Pilgrims
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type6">
                          <Input
                            type="radio"
                            name="type" id="type6" value="summer-camps"
                            checked={offer.type === "summer-camps"}
                            onChange={onChange}
                          />
                          Summer camps
                      </Label>
                      </FormGroup>
                    </Row>
                  </FormGroup>
                  <Label for="title">Offer title</Label>
                  <Input
                    type="text"
                    name="title" id="title" placeholder="Add offer title..." defaultValue={title}
                    className="mb-3"
                    onChange={onChange}
                  />
                  <Label for="description">Offer description</Label>
                  <Input
                    type="textarea"
                    name="description" id="description" placeholder="Describe offer..."  defaultValue={description}
                    className="mb-3"
                    onChange={onChange}
                  />
                  <CustomInput
                    type="file"
                    name="offer" id="offer" label="Choose offer image..."
                    onChange={onChangeFile}
                  />
                  <Button
                    color="dark"
                    style={{ marginTop: '2rem' }}
                    block>
                    Change offer data
          </Button>
                </Form>
              </ModalBody>
            </Modal>

            <div style={{ position: "relative" }}>
              <CardImg top src={image}
                height="200"
              />
              <div className="price">{price}</div>
              <div className="price" style={{ width: "100%" }}></div>
            </div>
            <CardBody>
              <CardTitle style={{ height: "2.4em" }}><strong>{title}</strong> </CardTitle>
              <div className="block-with-text" dangerouslySetInnerHTML={{ __html: sanitizer(description) }}></div>
            </CardBody>

            <CardFooter className="offer-footer" style={{marginLeft:"0", marginRight:"0"}}>
              <div style={{ margin: "auto 0" }}>{departureDate.slice(0, -14)}</div>
              <div style={{ textAlign: "end", margin: "auto 0" }}>{type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')}</div>
            </CardFooter>
          </Card>
  )
}

ChangeItem.propTypes = {
  deleteOffer: PropTypes.func.isRequired,
  updateOffer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default connect(
  mapStateToProps,
  { deleteOffer, updateOffer }
)(ChangeItem)
