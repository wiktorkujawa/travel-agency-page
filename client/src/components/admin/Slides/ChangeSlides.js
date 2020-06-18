import React, { useEffect } from 'react';
import {
  Card, CardBody, CardGroup, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { getSlides } from '../../../actions/slideActions';
import PropTypes from 'prop-types';
import ChangeItem from './ChangeItem';

const ChangeSlides = ({ getSlides, slides }) => {

  useEffect(() => {
    getSlides();
  }, [getSlides]);

  return (
    <CardGroup>
      {!(Array.isArray(slides) && slides.length) ?
        <Card className="mt-5 mb-5">
          <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>Temporary no slides</CardBody>
        </Card>
        :
        slides.map( slide => (

          <Col style={{ padding: "0" }}
            key={slide.files_id}
            sm="6"
            lg="4"
            xl="3"
          >
           <ChangeItem slide={slide}/>
          </Col>
        ))}

    </CardGroup>
  );
}

ChangeSlides.propTypes = {
  getSlides: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  slides: state.slide.slides
});

export default connect(
  mapStateToProps,
  { getSlides }
)(ChangeSlides)