import React, { useEffect, useState } from 'react';
import {
  Container, Button,
  Card, CardFooter, CardImg, CardBody,
  CardTitle, CardGroup, Col, NavLink, NavItem, Nav
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

const OfferList = ({ offers, match }) => {
  const sanitizer = dompurify.sanitize;

  //initial pagination settings
  const offersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPage = currentPage * offersPerPage;
  const indexOfFirstPage = indexOfLastPage - offersPerPage;

  const isMainPage = (Object.entries(match.params).length === 0 && match.params.constructor === Object);
  const offerTypes = (isMainPage ? offers : offers.filter(({ type }) => type === match.params.type));

  const offerTypesForPage = offerTypes.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [match]);


  //Events functions

  const changePage = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  //rendered elements
  const navOffer = <Nav tabs className="align-items-center filter-nav shadow-box" >
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
      <Card className="mt-5 mb-5 ml-2 mr-2 fadein-elements">
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

          <Card className="mt-5 fadein-elements">

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
      <div className="ml-2 mr-2">
        <NavLink className="item-main shadow-box mt-5 pl-2 pr-2" tag={RRNavLink} to={`${match.path.split(":", 1)}`}>
          Wszystkie
        </NavLink>
        {navOffer}
      </div>
      {cardList}
      {renderPageNumbers}

    </Container>
  );
}

OfferList.propTypes = {
  offers: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default connect(
  mapStateToProps,
  null
)(OfferList);