import React, { useEffect, useState } from 'react';
import {
  Container, Button,
  Card, CardBody, CardGroup, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPhotos } from '../actions/galleryActions';
import PropTypes from 'prop-types';

import GalleryItem from './GalleryItem';

const GalleryPage = ({ photos, getPhotos, match }) => {

  const [modal, setModal] = useState({});

  const photosPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPage = currentPage * photosPerPage;
  const indexOfFirstPage = indexOfLastPage - photosPerPage;

  const photosOnPage = photos.slice(indexOfFirstPage, indexOfLastPage)

  const changePage = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useEffect(() => {
    const createArray = () => {
      const newBools = photos.map(photo => false);
      setModal({ ...newBools });
    };
    createArray();
  }, [photos, match]);

  useEffect(() => {
    setCurrentPage(1);
  }, [match]);


  const toggle = (index) => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((photos.length / photosPerPage)); i++) {
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

  const nextPhoto = index => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
      if (index === Object.keys(modal).length - 1) index = -1;
      setModal(prevObjs => ({ ...prevObjs, [index + 1]: !prevObjs[index + 1] }))
    }
  }
  const previousPhoto = index => {
    return (event) => {
      setModal(prevObjs => ({ ...prevObjs, [index]: !prevObjs[index] }));
      if (index === 0) index = Object.keys(modal).length;
      setModal(prevObjs => ({ ...prevObjs, [index - 1]: !prevObjs[index - 1] }));
    }
  }

  const cardList = <CardGroup className="mb-3 mt-5" >
    {!(Array.isArray(photos) && photos.length) ?
      <Card className="mt-5 mb-5 fadein-elements">
        <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>Temporary no photos</CardBody>
      </Card>
      :
      photosOnPage.map((photosOnPage, index) => (
        <Col style={{ padding: "0" }}
          key={photosOnPage.files_id}
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <GalleryItem photosOnPage={photosOnPage} index={index} modal={modal} previousPhoto={previousPhoto} nextPhoto={nextPhoto} toggle={toggle} />
        </Col>
      ))}

  </CardGroup>;


  return (
    <Container fluid={true} className="content-wrap">
      {cardList}
      {renderPageNumbers}
    </Container>
  );
}



GalleryPage.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  photos: state.photo.photos
});

export default connect(
  mapStateToProps,
  { getPhotos }
)(GalleryPage);