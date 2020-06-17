import React, { useEffect } from 'react';
import {
  Container,
  Card, CardBody,
  CardGroup, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { deletePhoto, updatePhoto, getPhotos } from '../../../actions/galleryActions';
import PropTypes from 'prop-types';
import ChangeItem from './ChangeItem';

const ChangePhotos = ({ photos, getPhotos }) => {

  useEffect(() => {
    getPhotos()
  }, [getPhotos])

  return (
    <Container fluid={true} className="content-wrap" style={{ paddingLeft: "0", paddingRight: "0" }}>
      <CardGroup className="mb-3" >
    {!(Array.isArray(photos) && photos.length) ?
      <Card className="mt-5 mb-5">
        <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>chwilowo brak ofert w tej kategorii</CardBody>
      </Card>
      : photos.map( photo => (

        <Col
          key={photo.files_id}
          xs="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <ChangeItem photo={photo}/>
        </Col>
      ))}
  </CardGroup>
    </Container>
  );
}

ChangePhotos.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos
});

export default connect(
    mapStateToProps,
    { deletePhoto, updatePhoto, getPhotos }
  )(ChangePhotos)