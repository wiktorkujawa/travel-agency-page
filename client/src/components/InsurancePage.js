import React, { useEffect } from 'react';
import {
  Container, ListGroup, ListGroupItem,
  Col,
  Row
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getInsurance, updateInsurance } from '../actions/insuranceActions';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const Insurance = ({ getInsurance, insurances }) => {
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    getInsurance()
  }, [getInsurance])

  return (
    <Container fluid={true} className="content-wrap">
      <ListGroup className="mb-5">
        <TransitionGroup>
          {insurances.map(({ files_id, name, image }) => (
            < CSSTransition key={files_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" >
                <div>
                  <Row>
                    <Col md="4"> <div dangerouslySetInnerHTML={{ __html: sanitizer(name) }}></div></Col>
                    <Col md="8">
                      <div className="insurance-wrapper" style={{ height: "100vh" }}>

                        <img src={image} className="insurance-image" alt="" width="100%" height="100%" /> </div></Col>
                  </Row>
                </div>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>

  );
}

Insurance.propTypes = {
  getInsurance: PropTypes.func.isRequired,
  insurances: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  insurances: state.insurance.insurances
});

export default connect(
  mapStateToProps,
  { getInsurance, updateInsurance }
)(Insurance);