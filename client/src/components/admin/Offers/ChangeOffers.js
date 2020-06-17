import React, { useEffect, useState } from 'react';
import {
  Container, Button,
  Card, CardBody,
  CardGroup, Col, NavItem, Nav
} from 'reactstrap';
import { connect } from 'react-redux';
import { getOffers } from '../../../actions/offerActions';
import PropTypes from 'prop-types';
import ChangeItem from './ChangeItem';

const ChangeOffers = ({ offers, getOffers }) => {
  const [filterOffers, setFilterOffers] = useState('');

  useEffect(() => {
    getOffers()
  }, [getOffers])

  const offerTypes = (filterOffers ? offers.filter(({ type }) => type === filterOffers) : offers);

  const onFilter = (filterType) => {
    return (event) =>
      setFilterOffers(filterType);
  }

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
      : offerTypes.map( offer => (

        <Col
          key={offer.files_id}
          xs="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <ChangeItem offer={offer}/>
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

const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default connect(
    mapStateToProps,
    { getOffers }
  )(ChangeOffers)