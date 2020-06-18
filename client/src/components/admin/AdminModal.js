import React, { Fragment } from 'react';
import {
  Container,
  Card, NavLink, NavItem, Nav, Navbar
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

import EditAbout from './EditAbout';
import EditInsurance from './EditInsurance';
import EditContact from './EditContact';

import ChangeAnnouncements from './Announcements/ChangeAnnouncements';
import AddAnnouncement from './Announcements/AddAnnouncement';

import ChangeQuestions from './FAQ/ChangeQuestions';
import AddQuestion from './FAQ/AddQuestion';

import ChangePhotos from './Gallery/ChangePhotos';
import AddPhoto from './Gallery/AddPhoto';

import ChangeSlides from './Slides/ChangeSlides';
import AddSlide from './Slides/AddSlide';

import ChangeOffers from './Offers/ChangeOffers';
import AddOffer from './Offers/AddOffer';

import RegisterModal from '../auth/RegisterModal';
import ChangePassword from '../auth/ChangePassword';
import Logout from '../auth/Logout';


const AdminModal = ({ auth: { isAuthenticated, user }, match }) => {

  //rendered elements
  const navOffer = <Nav tabs className=" admin-nav shadow-box" >

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}about`}>
        About
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}insurance`}>
        Insurance
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}tourist-trips`}>
        Tourist trips
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}contact`}>
        Contact
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}slider`}>
        Slides
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}gallery`}>
        Gallery
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}faq`}>
        FAQ
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}announcements`}>
        Announcements
      </NavLink>
    </NavItem>

  </Nav>;

  const authLinks = (
    <Navbar color="light" light expand="sm" className="shadow-box">
      <Nav className="ml-auto" navbar pills >
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Witam ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          {
          match.params.type === "announcements" ? <AddAnnouncement /> :
            match.params.type === "faq" ? <AddQuestion /> :
              match.params.type === "gallery" ? <AddPhoto /> :
                match.params.type === "slider" ? <AddSlide /> :
                  match.params.type === "tourist-trips" ? <AddOffer /> : 
                    null
          }

        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <ChangePassword />
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Nav>
    </Navbar>
  );

  const adminContent = <div className="admin-modal-content">

    {authLinks}
    {match.params.type === "about" ? <EditAbout /> :
      match.params.type === "insurance" ? <EditInsurance /> :
        match.params.type === "announcements" ? <ChangeAnnouncements /> :
          match.params.type === "faq" ? <ChangeQuestions /> :
            match.params.type === "gallery" ? <ChangePhotos /> :
              match.params.type === "contact" ? <EditContact /> :
                match.params.type === "slider" ? <ChangeSlides /> :
                  match.params.type === "tourist-trips" ? <ChangeOffers /> : 
                    null
    }
  </div>;

  return (

    <Container fluid={true} className="admin-container">
      {isAuthenticated ?
        <Fragment>
          {navOffer}
          {adminContent}
        </Fragment>

        : <Card style={{ textAlign: "center", margin: "auto", padding: "90px" }}>
          <a href={`${match.path.split("admin-modal", 1)}`} >Go to homepage</a>
          <a href={`${match.path.split("admin-modal", 1)}admin`} >Go to login page</a>

        </Card>}

    </Container >
  );
}

AdminModal.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AdminModal);