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
import EditInsurancePage from './EditInsurancePage';
import EditAnnouncements from './EditAnnouncements';
import EditFAQ from './EditFAQ';
import EditGallery from './EditGallery';
import EditContact from './EditContact';
import EditSlide from './EditSlide';


import RegisterModal from '../auth/RegisterModal';
import ChangePassword from '../auth/ChangePassword';
import Logout from '../auth/Logout';
import AnnouncementModal from './modals/AnnouncementModal';
import QuestionModal from './modals/QuestionModal';
import GalleryModal from './modals/GalleryModal';
import SliderModal from './modals/SliderModal';


const AdminModal = ({ auth: { isAuthenticated, user }, match }) => {

  //rendered elements
  const navOffer = <Nav tabs className=" admin-nav shadow-box" >

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}o-nas`}>
        O nas
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}ubezpieczenia`}>
        Ubezpieczenia
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}wyjazdy-turystyczne`}>
        Wyjazdy turystyczne
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}kontakt`}>
        Kontakt
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}slajdy`}>
        Slajdy
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}galeria`}>
        Galeria
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}faq`}>
        FAQ
      </NavLink>
    </NavItem>

    <NavItem >
      <NavLink className="checked-type" tag={RRNavLink} to={`${match.path.split(":", 1)}ogloszenia`}>
        Ogłoszenia
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
          {match.params.type === "ogloszenia" ? <AnnouncementModal /> :
            match.params.type === "faq" ? <QuestionModal /> :
              match.params.type === "galeria" ? <GalleryModal /> :
                match.params.type === "slajdy" ? <SliderModal /> : null}

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
    {match.params.type === "o-nas" ? <EditAbout /> :
      match.params.type === "ubezpieczenia" ? <EditInsurancePage /> :
        match.params.type === "ogloszenia" ? <EditAnnouncements /> :
          match.params.type === "faq" ? <EditFAQ /> :
            match.params.type === "galeria" ? <EditGallery /> :
              match.params.type === "kontakt" ? <EditContact /> :
                match.params.type === "slajdy" ? <EditSlide /> :
                  match.params.type === "wyjazdy-turystyczne" ? <a href={`${match.path.split("admin-modal", 1)}wyjazdy-turystyczne`} style={{ textAlign: "center", position: "absolute", top: "50%", left: "50%" }}>Przejdź do listy ofert</a> : null
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
          <a href={`${match.path.split("admin-modal", 1)}`} >Przejdź do strony głównej</a>
          <a href={`${match.path.split("admin-modal", 1)}admin`} >Przejdź do strony logowania</a>

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