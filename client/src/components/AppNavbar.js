import React, { useState, Fragment, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { getContact } from '../actions/contactActions';
import { getOffers } from '../actions/offerActions';
import PropTypes from 'prop-types';
import {
  NavLink as RRNavLink
} from 'react-router-dom';
import dompurify from 'dompurify';
const AppNavbar = ({ getContact, getOffers, contacts, isAuthenticated }) => {
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    getContact();
    getOffers();
  }, [getContact, getOffers])

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const upperNavbar =
    <Fragment>
      <NavbarToggler onClick={toggle} ></NavbarToggler>
      {contacts.map(({ _id, workTime, email, phoneNumber }) => (
        <Nav key={_id} navbar className="ml-xs-auto ml-md-auto mb-2">

          <NavItem className="align-items-center ml-1 nav-border mr-2" >
            <i className="fa fa-clock-o fa-2x align-items-center mr-2" aria-hidden="true">
              <span style={{ fontSize: "1rem" }} className="ml-1">
                {workTime}
              </span>  </i>
          </NavItem>
          <NavItem className="align-items-center mr-2 nav-border">
            <i className="fa fa-envelope fa-2x align-items-center mr-2" aria-hidden="true">
              <span style={{ fontSize: "1rem" }} className="ml-1">
                {email}
              </span>  </i>
          </NavItem>
          <NavItem className="align-items-center">
            <i className="fa fa-phone fa-2x align-items-center mr-2" style={{ whiteSpace: "nowrap" }} aria-hidden="true">
              <span className="ml-1 mt-2">
                <div dangerouslySetInnerHTML={{ __html: sanitizer(phoneNumber) }}></div>
              </span>
            </i>
          </NavItem>
        </Nav>
      ))
      }
    </Fragment>

  const lowerNavbar = <Collapse isOpen={isOpen} navbar style={{ textAlign: "center" }} className=" mx-lg-auto mx-xs-auto mb-2">

    <Nav navbar pills>
      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/o-nas" target={"_top"}>
          O nas
        </NavLink>
      </NavItem>

      <UncontrolledDropdown nav inNavbar className="ml-3" >
        <DropdownToggle nav caret>
          Oferty
        </DropdownToggle>
        <DropdownMenu right >
          <DropdownItem tag={RRNavLink} to="/wyjazdy-turystyczne/" target={"_top"}>
            Wyjazdy turystyczne
          </DropdownItem>

          <DropdownItem tag={RRNavLink} to="/ubezpieczenia" target={"_top"}>
            Ubezpieczenia
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/ogloszenia" target={"_top"}>
          Ogłoszenia
        </NavLink>
      </NavItem>

      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/galeria" target={"_top"} >
          Galeria
        </NavLink>
      </NavItem>

      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/faq" target={"_top"}>
          FAQ
        </NavLink>
      </NavItem>
      {isAuthenticated ?
        <NavItem className="ml-3" style={{ backgroundColor: "red", borderRadius: "15px" }}>
          <NavLink tag={RRNavLink} to="/admin-modal" target={"_top"}>
            Panel administracyjny
        </NavLink>
        </NavItem> : null
      }
    </Nav>
  </Collapse>

  return (

    <Navbar color="light" light expand="md" className="main-navbar shadow-box" >

      <NavbarBrand href="/" className="mx-auto" >
        <img src="/logo.svg" width="240" alt="" />
      </NavbarBrand>
      <Container fluid={true} style={{ flexDirection: "column" }}>
        {upperNavbar}
        {lowerNavbar}
      </Container>
    </Navbar >

  );
}

AppNavbar.propTypes = {
  getContact: PropTypes.func.isRequired,
  getOffers: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,
  { getContact, getOffers }
)(AppNavbar);