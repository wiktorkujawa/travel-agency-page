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
import { deleteOffer, updateOffer, getOffers } from '../../actions/offerActions';
import PropTypes from 'prop-types';
import OfferModal from '../OfferModal';
import dompurify from 'dompurify';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

const AdminModal = ({ deleteOffer, offers, updateOffer, getOffers }) => {
  const sanitizer = dompurify.sanitize;

  // Offer and image data
  const [offerName, setOfferName] = useState({});
  const [fileData, setFileData] = useState({});

  const [modal, setModal] = useState({});

  //initial pagination settings
  // const offersPerPage = 4;
  // const [currentPage, setCurrentPage] = useState(1);
  // const indexOfLastPage = currentPage * offersPerPage;
  // const indexOfFirstPage = indexOfLastPage - offersPerPage;


  // const isMainPage = (Object.entries(match.params).length === 0 && match.params.constructor === Object);
  // const offerTypes = (isMainPage ? offers : offers.filter(({ type }) => type === match.params.type));

  // const offerTypesForPage = offerTypes.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    getOffers()
  }, [getOffers])

  useEffect(() => {
    const createArray = () => {
      // const temporaryOffers = (Object.entries(match.params).length === 0 && match.params.constructor === Object) ? offers : offers.filter(({ type }) => type === match.params.type);
      const newNames = offers.map(offer => offer);
      setOfferName({ ...newNames });
      const newBools = offers.map(offer => false);
      setModal({ ...newBools });
      const newFiles = offers.map(offer => null);
      setFileData({ ...newFiles });
    };
    createArray();
  }, [offers]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [match]);


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
  // const changePage = (event) => {
  //   setCurrentPage(Number(event.target.id));
  // }
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
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/indywidualne-i-rodzinne`}>
        Indywidualne i rodzinne
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/zielone-szkoly`}>
        Zielone szkoły
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/kolonie-i-obozy`}>
        Kolonie i obozy
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/pielgrzymki`}>
        Pielgrzymki
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/wycieczki-szkolne`}>
        Wycieczki szkolne
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`wyjazdy-turystyczne/firmowe`}>
        Firmowe
      </NavLink>
    </NavItem>

  </Nav>;


  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(offerTypes.length / offersPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const renderPageNumbers = pageNumbers.map(number => {
  //   return (
  //     <Button
  //       key={number}
  //       id={number}
  //       onClick={changePage}
  //       active={currentPage === number}
  //     >
  //       {number}
  //     </Button>
  //   );
  // });

  const cardList = <CardGroup className="mb-3" >

    {!(Array.isArray(offers) && offers.length) ?
      <Card className="mt-5 mb-5">
        <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>chwilowo brak ofert w tej kategorii</CardBody>
      </Card>
      : offers.map(({ _id, files_id, image, title, departureDate, departureTime, price, tripLocation, type, description }, index) => (

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
                      placeholder="Dodaj datę wyjazdu..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="Godzina wyjazdu">Arrival time</Label>
                    <Input
                      type="text"
                      name="departureTime"
                      id="departureTime"
                      defaultValue={departureTime}
                      placeholder="Dodaj godzinę wyjazdu..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="price">Cena</Label>
                    <Input
                      type="text"
                      name="price"
                      id="price"
                      defaultValue={price}
                      placeholder="Wstaw cenę..."
                      onChange={onChange(offerName, index)}
                    />
                    <Label for="tripLocation">Lokalizacja</Label>
                    <Input
                      type="text"
                      name="tripLocation"
                      id="tripLocation"
                      defaultValue={tripLocation}
                      placeholder="Dodaj lokalizację wycieczki..."
                      onChange={onChange(offerName, index)}
                    />
                  </FormGroup>


                  <FormGroup tag="fieldset">
                    <legend>Typ oferty</legend>
                    <Row style={{ justifyContent: "space-evenly" }}>
                      <FormGroup check  >
                        <Label check for="type1">
                          <Input
                            type="radio"
                            name="type"
                            id="type1"
                            value="indywidualne-i-rodzinne"
                            onChange={onChange(offerName, index)}
                          />
                          Indywidualne i rodzinne
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type2">
                          <Input
                            type="radio"
                            name="type"
                            id="type2"
                            value="firmowe"
                            onChange={onChange(offerName, index)}
                          />
                          Firmowe
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type3">
                          <Input
                            type="radio"
                            name="type"
                            id="type3"
                            value="zielone-szkoly"
                            onChange={onChange(offerName, index)}
                          />
                          Zielone szkoły
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
                            value="wycieczki-szkolne"
                            onChange={onChange(offerName, index)}
                          />
                          Wycieczki szkolne
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type5">
                          <Input
                            type="radio"
                            name="type"
                            id="type5"
                            value="pielgrzymki"
                            onChange={onChange(offerName, index)}
                          />
                          Pielgrzymki
                      </Label>
                      </FormGroup>
                      <FormGroup check >
                        <Label check for="type6">
                          <Input
                            type="radio"
                            name="type"
                            id="type6"
                            value="kolonie-i-obozy"
                            onChange={onChange(offerName, index)}
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
                    placeholder="Podaj tytuł oferty..."
                    className="mb-3"
                    defaultValue={title}
                    onChange={onChange(offerName, index)}
                  />
                  <Label for="description">Opis oferty</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Opisz ofertę..."
                    defaultValue={description}
                    className="mb-3"
                    onChange={onChange(offerName, index)}
                  />
                  <CustomInput
                    type="file"
                    name="offer"
                    id="offer"
                    label="Wybierz obrazek oferty..."
                    onChange={onChangeFile(index)}
                  />


                  <Button
                    color="dark"
                    style={{ marginTop: '2rem' }}
                    block>
                    Zmień dane oferty
          </Button>
                </Form>
              </ModalBody>
            </Modal>

            <NavLink tag={RRNavLink} to={`/admin/${type}/${_id}`}
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

      <NavLink className="item-main shadow-box mt-5 pl-2 pr-2" tag={RRNavLink} to={`wyjazdy-turystyczne/`}>
        Wszystkie
      </NavLink>


      {navOffer}
      {cardList}
      {/* {renderPageNumbers} */}

      {/* <OfferModal /> */}

    </Container>
  );
}



AdminModal.propTypes = {
  offers: PropTypes.array.isRequired,
  getOffers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default connect(
  mapStateToProps,
  { deleteOffer, updateOffer, getOffers }
)(AdminModal);