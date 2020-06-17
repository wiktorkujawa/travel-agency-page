import React, { useEffect, useState } from 'react';
import {
  Container, Button,
  Card, CardBody, CardGroup, Col, NavLink, NavItem, Nav
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  NavLink as RRNavLink
} from 'react-router-dom';
import OfferItem from './OfferItem';

const OfferList = ({ offers, match: { params, path } }) => {

  //initial pagination settings
  const offersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPage = currentPage * offersPerPage;
  const indexOfFirstPage = indexOfLastPage - offersPerPage;

  const isMainPage = (Object.entries(params).length === 0 && params.constructor === Object);
  const offerTypes = (isMainPage ? offers : offers.filter(({ type }) => type === params.type));

  const offerTypesForPage = offerTypes.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  //Events functions
  const changePage = (event) => {
    setCurrentPage(Number(event.target.id));
  }
  
  //rendered elements
  const navOffer = <Nav tabs className="align-items-center filter-nav shadow-box" >
    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}individual`}>
        Individual
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}field-trips`}>
        Field trips
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}summer-camps`}>
        Summer camps
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}pilgrims`}>
        Pilgrims
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}school-trips`}>
        School trips
      </NavLink>
    </NavItem>

    <NavItem className="choose-offer-type">
      <NavLink className="checked-type" tag={RRNavLink} to={`${path.split(":", 1)}bussiness-trips`}>
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
      : offerTypesForPage.map(offerTypesForPage => (

        <Col
          key={offerTypesForPage.files_id}
          xs="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <OfferItem offerData={offerTypesForPage} pathType={path} />
        </Col>
      ))}
  </CardGroup>;

  return (
    <Container fluid={true} className="content-wrap" style={{ paddingLeft: "0", paddingRight: "0" }}>
      <div className="ml-2 mr-2">
        <NavLink className="item-main shadow-box mt-5 pl-2 pr-2" tag={RRNavLink} to={`${path.split(":", 1)}`}>
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