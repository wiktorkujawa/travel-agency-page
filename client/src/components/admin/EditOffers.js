import React, { useEffect, useState } from 'react';
import {
  Container, Button, Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Card, CardFooter, CardImg, CardBody,
  CardTitle, CardGroup, Row, Col, NavItem, Nav, CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteOffer, updateOffer, getOffers, addOffer } from '../../actions/offerActions';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const ChangeOffers = ({ deleteOffer, offers, updateOffer, getOffers }) => {
  const sanitizer = dompurify.sanitize;

  // Offer and image data
  const [offerName, setOfferName] = useState({});
  const [fileData, setFileData] = useState({});

  const [filterOffers, setFilterOffers] = useState('');

  const [modal, setModal] = useState({});

  const offerTypes = (filterOffers ? offers.filter(({ type }) => type === filterOffers) : offers);

  useEffect(() => {
    getOffers()
  }, [getOffers])

  useEffect(() => {
    const createArray = () => {
      const newNames = offers.map(offer => offer);
      setOfferName({ ...newNames });
      const newBools = offers.map(offer => false);
      setModal({ ...newBools });
      const newFiles = offers.map(offer => null);
      setFileData({ ...newFiles });
    };
    createArray();
  }, [offers]);

  //Events functions
  const onChange = (offer, index) => {
    return (event) => {
      const { name, value } = event.target;
      setOfferName(prevObjs => ({ ...prevObjs, [index]: { ...offer[index], [name]: value } }));
    }
  }

  const onFilter = (filterType) => {
    return (event) =>
      setFilterOffers(filterType);
  }

  const onChangeFile = (index) => {
    return (event) => {
      const { target: { files } } = event;
      setFileData(prevObjs => ({ ...prevObjs, [index]: files[0] }));
    }
  };

  const toggle = (index) => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
    }
  };
  const onSubmit = (offerName, index, id) => {
    return (event) => {
      event.preventDefault();

      if (fileData[index] != null) {
        const newOffer = new FormData();
        newOffer.append('offer', fileData[index]);

        const { title, departureDate, departureTime, price, tripLocation, type, description } = offerName[index];

        newOffer.append('title', title);
        newOffer.append('departureDate', departureDate);
        newOffer.append('departureTime', departureTime);
        newOffer.append('price', price);
        newOffer.append('tripLocation', tripLocation);
        newOffer.append('type', type);
        newOffer.append('description', description);

        // Update offer via addOffer action
        updateOffer(id, newOffer);

        setFileData(prevObjs => ({ ...prevObjs, [index]: null }));

        // Close modal
        toggle(index);
      }
      else {
        const { title, departureDate, departureTime, price, tripLocation, type, description } = offerName[index];
        const newOffer = { title, departureDate, departureTime, price, tripLocation, type, description };

        // Update offer via addOffer action
        updateOffer(id, newOffer);

        // Close modal
        toggle(index);
      }
    }
  }
  const onDeleteClick = id => {
    deleteOffer(id);
  };

  //rendered elements
  const navOffer = <Nav tabs className="align-items-center  shadow-box pl-2 pr-2" >
    <NavItem className="choose-offer-type">
      <Button className="shadow-box" style={{ width: "100%" }} onClick={onFilter('')}>
        All
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('individual')}>
        Individual
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('field-trips')}>
        Field trips
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('summer-camps')}>
        Summer camps
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('pilgrims')}>
        Pilgrims
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('school-trips')}>
        School trips
      </Button>
    </NavItem>

    <NavItem className="choose-offer-type">
      <Button style={{ width: "100%" }} onClick={onFilter('bussiness-trips')}>
        Bussiness Trips
      </Button>
    </NavItem>

  </Nav>;

  const cardList = <CardGroup className="mb-3" >
    {!(Array.isArray(offers) && offers.length) ?
      <Card className="mt-5 mb-5">
        <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>chwilowo brak ofert w tej kategorii</CardBody>
      </Card>
      : offerTypes.map(({ _id, files_id, image, title, departureDate, departureTime, price, tripLocation, type, description }, index) => (

        <Col
          key={files_id}
          xs="12"
          sm="6"
          lg="4"
          xl="3"
        >

          <Card className="mt-5">

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
              Change Offer
              </Button>

            <Modal
              isOpen={modal[index]}
              toggle={toggle(index)}
              size="lg"
            >
              <ModalHeader toggle={toggle(index)}>Dane Oferty</ModalHeader>
              <ModalBody>

                <Form onSubmit={onSubmit(offerName, index, files_id)}>
                  <FormGroup>
                    <Label for="departureDate">Data wyjazdu</Label>
                    <Input
                      type="date"
                      name="departureDate"
                      id="departureDate"
                      defaultValue={departureDate}
                      placeholder="Add departure date..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="Departure time">Deaparture time</Label>
                    <Input
                      type="text"
                      name="departureTime"
                      id="departureTime"
                      defaultValue={departureTime}
                      placeholder="Add departure time..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="price">Price</Label>
                    <Input
                      type="text"
                      name="price"
                      id="price"
                      defaultValue={price}
                      placeholder="Insert price..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="tripLocation">Location</Label>
                    <Input
                      type="text"
                      name="tripLocation"
                      id="tripLocation"
                      defaultValue={tripLocation}
                      placeholder="Add trip location..."
                      onChange={onChange(offerName, index)}
                    />
                  </FormGroup>


                  <FormGroup tag="fieldset">
                    <legend>Offer type</legend>
                    <Row style={{ justifyContent: "space-evenly" }}>
                      <FormGroup check  >
                        <Label check for="type1">
                          <Input
                            type="radio"
                            name="type"
                            id="type1"
                            value="individual"
                            onChange={onChange(offerName, index)}
                          />
                          Individual
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type2">
                          <Input
                            type="radio"
                            name="type"
                            id="type2"
                            value="bussiness-trips"
                            onChange={onChange(offerName, index)}
                          />
                          Bussiness Trips
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type3">
                          <Input
                            type="radio"
                            name="type"
                            id="type3"
                            value="field-trips"
                            onChange={onChange(offerName, index)}
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
                            name="type"
                            id="type4"
                            value="school-trips"
                            onChange={onChange(offerName, index)}
                          />
                          School trips
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type5">
                          <Input
                            type="radio"
                            name="type"
                            id="type5"
                            value="pilgrims"
                            onChange={onChange(offerName, index)}
                          />
                          Pilgrims
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type6">
                          <Input
                            type="radio"
                            name="type"
                            id="type6"
                            value="summer-camps"
                            onChange={onChange(offerName, index)}
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
                    placeholder="Add offer title..."
                    className="mb-3"
                    defaultValue={title}
                    onChange={onChange(offerName, index)}
                  />
                  <Label for="description">Offer description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Describe offer..."
                    defaultValue={description}
                    className="mb-3"
                    onChange={onChange(offerName, index)}
                  />
                  <CustomInput
                    type="file"
                    name="offer"
                    id="offer"
                    label="Choose offer image..."
                    onChange={onChangeFile(index)}
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

            <CardFooter className="offer-footer">
              <div style={{ margin: "auto 0" }}>{departureDate.slice(0, -14)}</div>
              <div style={{ textAlign: "end", margin: "auto 0" }}>{type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')}</div>
            </CardFooter>
          </Card>
        </Col>
      ))}
  </CardGroup>;

  return (
    <Container fluid={true} className="content-wrap" style={{ paddingLeft: "0", paddingRight: "0" }}>
      {navOffer}
      {cardList}
    </Container>
  );
}

ChangeOffers.propTypes = {
  getOffers: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired
}


const AddOffers = ({ addOffer }) => {
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
        color="info"
        size="md"
        onClick={toggle}
        style={{ zIndex: "1000" }}
      >Add offer
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


const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default {
  ChangeOffers: connect(
    mapStateToProps,
    { deleteOffer, updateOffer, getOffers }
  )(ChangeOffers),
  AddOffers: connect(
    mapStateToProps,
    { addOffer }
  )(AddOffers)
}