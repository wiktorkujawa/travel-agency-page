import React from 'react';
import {
  Card, CardHeader, CardFooter, CardImg, CardBody,
  Row, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const SingleOffer = ({ offers, match }) => {
  const sanitizer = dompurify.sanitize;

  const { params: { oferta } } = match

  const singleOffer = offers.filter(({ _id }) => _id === oferta);
  return (
    <div className="content-wrap" style={{ width: "100%" }} >
      {singleOffer.map(({ price, description, tripLocation, image, title, type, departureDate, departureTime }) => (
        <Card key={title}>
          <div style={{ position: "relative" }}>
            <CardImg top src={image} className="slide-image" />
            <div className="title">{title}</div>
            <a href="#main-info" className="scroll"><i className="fa fa-angle-down fa-2x" aria-hidden="true"></i>
            </a>
          </div>
          <CardHeader id="main-info">
            <Row style={{ whiteSpace: "nowrap" }}>
              <Col xs="12" sm="6" xl="3"><i className="fa fa-calendar fa-4x align-items-left" aria-hidden="true">
                <span className="ml-4">
                  <h4>{departureDate.slice(0, -14)}</h4>
                  <h6 style={{ color: "grey" }}>Departure date</h6>
                </span>  </i></Col>
              <Col xs="12" sm="6" xl="3"><i className="fa fa-bus fa-4x align-items-left mt-2" aria-hidden="true">
                <span className="ml-4">
                  <h4>{tripLocation}</h4>
                  <h6 style={{ color: "grey" }}>Location</h6>
                </span>  </i></Col>
              <Col xs="12" sm="6" xl="3"><i className="fa fa-clock-o fa-4x align-items-left mt-2" aria-hidden="true">
                <span className="ml-4">
                  <h4>{departureTime}</h4>
                  <h6 style={{ color: "grey" }}>Departure hour</h6>
                </span>  </i></Col>
              <Col xs="12" sm="6" xl="3"><i className="fa fa-euro fa-4x align-items-left mt-2" aria-hidden="true">
                <span style={{ marginLeft: "2.5rem" }}>
                  <h4>{price}</h4>
                  <h6 style={{ color: "grey" }}>Cost per person</h6>
                </span>  </i></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={{ __html: sanitizer(description) }}></div>
          </CardBody>
          <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{departureDate.replace("T", " ").slice(0, -14)}</div>
            <div>{type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')}</div>
          </CardFooter>


        </Card>
      ))}
    </div>
  );
}

SingleOffer.propTypes = {
  offers: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  offers: state.offer.offers
});

export default connect(
  mapStateToProps,
  null
)(SingleOffer);