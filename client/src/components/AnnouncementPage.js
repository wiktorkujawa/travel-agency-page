import React, { useEffect, useState } from 'react';
import {
  Container, ListGroup, ListGroupItem, Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getAnnouncements } from '../actions/announcementActions';
import PropTypes from 'prop-types';

const AnnouncementPage = ({ getAnnouncements, announcements }) => {

  //initial pagination settings
  const offersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPage = currentPage * offersPerPage;
  const indexOfFirstPage = indexOfLastPage - offersPerPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(announcements.length / offersPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getAnnouncements()
  }, [getAnnouncements])


  //Events functions
  const changePage = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  //rendered elements
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
  const announcementList = <ListGroup className="mb-5">
    <TransitionGroup>
      {!(Array.isArray(announcements) && announcements.length) ?
        < CSSTransition timeout={500} classNames="fade" >
          <ListGroupItem style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }} className="content-margin">
            Temporary no announcements
          </ListGroupItem>
        </CSSTransition>
        : announcements.slice(indexOfFirstPage, indexOfLastPage).map(({ _id, name, content, date }) => (
          < CSSTransition key={_id} timeout={500} classNames="fade" >
            <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
              <h2>{name}</h2>
              <p>{content}</p>
              <p className="text-muted">{date.replace("T", " ").slice(0, -8)}</p>
            </ListGroupItem>
          </CSSTransition>
        ))}
    </TransitionGroup>
  </ListGroup>;


  return (
    <Container fluid={true} className="content-wrap">
      {announcementList}
      {renderPageNumbers}
    </Container>
  );
}

AnnouncementPage.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements
});

export default connect(
  mapStateToProps,
  { getAnnouncements }
)(AnnouncementPage);