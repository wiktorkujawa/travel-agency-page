import React, { useState, useEffect, Fragment } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
  Container,
  Col,
  Card, CardImg, CardBody, CardFooter, CardTitle, CardGroup, NavLink
} from 'reactstrap';
import {
  NavLink as RRNavLink
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getSlides, deleteSlide } from '../actions/slideActions';
import PropTypes from 'prop-types';
import MainPageModal from './MainPageModal';
import dompurify from 'dompurify';



const MainPage = ({ getSlides, deleteSlide, slides, offers, isAuthenticated }) => {

  const sanitizer = dompurify.sanitize;
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    getSlides();
  }, [getSlides]);

  const onDeleteClick = id => {
    deleteSlide(id)
  };


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const lastOffers = <Fragment>
    <div className="last-offers" >
      Najnowsze oferty
    </div>

    <CardGroup className="pt-5" style={{ backgroundColor: "#DDDDDD" }} >
      {!(Array.isArray(offers) && offers.length) ?
        <Card className="mt-5 mb-5">
          <CardBody style={{ textAlign: "center", fontStyle: "italic" }}>chwilowo brak ofert</CardBody>
        </Card> :
        offers.slice(0, 4).map(({ _id, files_id, image, title, arrivalDate, price, type, description }) => (

          <Col
            key={files_id}
            xs="12"
            md="6"
            xl="3"
          >
            <Card className="mb-5">
              <NavLink tag={RRNavLink} to={`/wyjazdy-turystyczne/${type}/${_id}`}
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
                  <CardTitle style={{ height: "3.6em" }}><strong>{title}</strong> </CardTitle>
                  <div className="block-with-text" dangerouslySetInnerHTML={{ __html: sanitizer(description) }}></div>
                </CardBody>

                <CardFooter className="offer-footer">
                  <div style={{ margin: "auto 0" }}>{arrivalDate.slice(0, -14)}</div>
                  <div style={{ textAlign: "end", margin: "auto 0" }}>{type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')}</div>
                </CardFooter>
              </NavLink>

            </Card>

          </Col>
        ))}
    </CardGroup>
  </Fragment>;


  if (slides.length > 0) {
    const preparedSlides = slides.map(({ files_id, src, caption, header }) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={files_id}
        >
          <div className="slide-layout" >
            <img src={src} className="slide-image" alt="" />
            {isAuthenticated ?
              <Button
                className="slide-modify"
                color="danger"
                size="lg"
                onClick={onDeleteClick.bind(this, files_id)}
              >&times;
          </Button> : null}
            <MainPageModal />
          </div>

          <CarouselCaption captionText={caption} captionHeader={header} />
        </CarouselItem>
      );
    });

    return (
      <Container fluid={true} className="content-wrap" style={{ paddingLeft: "0", paddingRight: "0" }} >
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {preparedSlides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        {lastOffers}
      </Container>
    );
  }
  else
    return (<MainPageModal className="content-wrap" />)
}

MainPage.propTypes = {
  getSlides: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  offers: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  offers: state.offer.offers,
  slides: state.slide.slides,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getSlides, deleteSlide }
)(MainPage);