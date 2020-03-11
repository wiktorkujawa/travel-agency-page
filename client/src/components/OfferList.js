import React, { useEffect, useState, Fragment } from 'react';
import {
  Container, Button, Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Card, CardFooter, CardImg, CardBody,
  CardTitle, CardGroup, Row, Col, NavLink, NavItem, Nav, CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteOffer, updateOffer } from '../actions/offerActions';
import PropTypes from 'prop-types';
import OfferModal from './OfferModal';
import dompurify from 'dompurify';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

const OfferList = ({ deleteOffer, isAuthenticated, offers, updateOffer, match }) => {
  const sanitizer = dompurify.sanitize;

  // Offer and image data
  const [offerName, setOfferName] = useState({});
  const [fileData, setFileData] = useState({});

  const [modal, setModal] = useState({});

  //initial pagination settings
  const offersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPage = currentPage * offersPerPage;
  const indexOfFirstPage = indexOfLastPage - offersPerPage;


  const isMainPage = (Object.entries(match.params).length === 0 && match.params.constructor === Object);
  const offerTypes = (isMainPage ? offers : offers.filter(({ type }) => type === match.params.type));

  const offerTypesForPage = offerTypes.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    const createArray = () => {
      const temporaryOffers = (Object.entries(match.params).length === 0 && match.params.constructor === Object) ? offers : offers.filter(({ type }) => type === match.params.type);
      const newNames = temporaryOffers.map(offer => offer);
      setOfferName({ ...newNames });
      const newBools = temporaryOffers.map(offer => false);
      setModal({ ...newBools });
      const newFiles = temporaryOffers.map(offer => null);
      setFileData({ ...newFiles });
    };
    createArray();
  }, [offers, match]);

  useEffect(() => {
    setCurrentPage(1);
  }, [match]);


  //Events functions
  const onChange = (offer, index) => {
    return (event) => {
      const { name, value } = event.target;
      setOfferName(prevObjs => ({ ...prevObjs, [index]: { ...offer[index], [name]: value } }));
    }
  }
  const onChangeFile = (index) => {
    return (event) => {
      const { target: { files } } = event;
      setFileData(prevObjs => ({ ...prevObjs, [index]: files[0] }));
    }
  };
  const changePage = (event) => {
    setCurrentPage(Number(event.target.id));
  }
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
  const navOffer = <Nav tabs className="align-items-center filter-nav shadow-box pl-2 pr-2" >

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}individual`}>
        Individual
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}field-trips`}>
        Field trips
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}summer-camps`}>
        Summer camps
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}pilgrims`}>
        Pilgrims
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}school-trips`}>
        School trips
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}bussiness-trips`}>
        Bussiness trips
      </NavLink>
    </NavItem>

  </Nav>;


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(offerTypes.length / offersPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <Button
        key={number}
        id={number}
        onClick={changePage}
        active={currentPage === number}
      >
        {number}
      </Button>
    );
  });

  const cardList = <CardGroup className="mb-3" >

    {!(Array.isArray(offerTypes) && offerTypes.length) ?
      <Card className="mt-5 mb-5">
        <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>Temporary no offers in this category</CardBody>
      </Card>
      : offerTypesForPage.map(({ _id, files_id, image, title, departureDate, departureTime, price, tripLocation, type, description }, index) => (

        <Col
          key={files_id}
          xs="12"
          sm="6"
          lg="4"
          xl="3"
        >

          <Card className="mt-5">
            {isAuthenticated ?
              <Fragment>
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
                  Change offer data
              </Button>
              </Fragment>
              :
              null
            }

            <Modal
              isOpen={modal[index]}
              toggle={toggle(index)}
              className="open-offer-modal"
              size="lg"
            >
              <ModalHeader toggle={toggle(index)}>Offer data</ModalHeader>
              <ModalBody>

                <Form onSubmit={onSubmit(offerName, index, files_id)}>
                  <FormGroup>
                    <Label for="departureDate">Departure date</Label>
                    <Input
                      type="date"
                      name="departureDate"
                      id="departureDate"
                      defaultValue={departureDate}
                      placeholder="Add departure date..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="Departure hour">Departure time</Label>
                    <Input
                      type="text"
                      name="departureTime"
                      id="departureTime"
                      defaultValue={departureTime}
                      placeholder="Add departure hour..."
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
                    <Label for="tripLocation">Trip location</Label>
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
                          Bussiness trips
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
                    placeholder="Insert offer title..."
                    className="mb-3"
                    defaultValue={title}
                    onChange={onChange(offerName, index)}
                  />
                  <Label for="description">Offer description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Describe the offer..."
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

            <NavLink tag={RRNavLink} to={`${match.path.split(":", 1)}${type}/${_id}`}
              target={"_top"}
            >
              <div style={{ overflow: "hidden", position: "relative" }}>
                <CardImg top src={image} className="card-image"
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
            </NavLink>

          </Card>

        </Col>
      ))}
  </CardGroup>;

  return (
    <Container fluid={true} className="content-wrap" style={{ paddingLeft: "0", paddingRight: "0" }}>

      <NavLink className="item-main shadow-box mt-5 pl-2 pr-2" tag={RRNavLink} to={`${match.path.split(":", 1)}`}>
        Wszystkie
      </NavLink>


      {navOffer}
      {cardList}
      {renderPageNumbers}

      <OfferModal />

    </Container>
  );
}



OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  offers: state.offer.offers,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { deleteOffer, updateOffer }
)(OfferList);