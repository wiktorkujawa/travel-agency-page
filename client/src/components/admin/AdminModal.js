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
import EditAnnouncements from './EditAnnouncements';
import EditFAQ from './EditFAQ';
import EditGallery from './EditGallery';
import EditContact from './EditContact';
import EditSlide from './EditSlide';
import EditOffers from './EditOffers';

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
          {match.params.type === "announcements" ? <EditAnnouncements.AddAnnouncements /> :
            match.params.type === "faq" ? <EditFAQ.AddQuestion /> :
              match.params.type === "gallery" ? <EditGallery.AddGallery /> :
                match.params.type === "slider" ? <EditSlide.AddSlide /> : null}

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
        match.params.type === "announcements" ? <EditAnnouncements.ChangeAnnouncements /> :
          match.params.type === "faq" ? <EditFAQ.ChangeQuestion /> :
            match.params.type === "gallery" ? <EditGallery.ChangeGallery /> :
              match.params.type === "contact" ? <EditContact /> :
                match.params.type === "slider" ? <EditSlide.ChangeSlide /> :
                  // match.params.type === "tourist-trips" ? <a href={`${match.path.split("admin-modal", 1)}tourist-trips`} style={{ textAlign: "center", position: "absolute", top: "50%", left: "50%" }}>Go to offers list</a>
                  match.params.type === "tourist-trips" ? <EditOffers />
                    : null
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