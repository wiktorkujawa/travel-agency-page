import React from 'react'
import {
  Container,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
const Footer = ({ contacts }) => {
  const sanitizer = dompurify.sanitize;

  const contactSection = <div className="mb-1 footer-contactSection">
    <h5 className="ml-4">Contact Us!</h5>
    {contacts.map(({ _id, address, email, phoneNumber }) => (
      <ul style={{ fontSize: "2rem" }} key={_id} className="fa-ul">
        <li style={{ padding: "0.5em 0" }}>
          <span className="fa-li"><i className="fa fa-map-marker fa-fw mt-3" style={{ color: "#FF851B" }}></i></span><div dangerouslySetInnerHTML={{ __html: sanitizer(address) }}></div>
        </li>
        <li style={{ padding: "0.5em 0" }}>
          <span className="fa-li"><i className="fa fa-envelope fa-fw" style={{ color: "#FF851B" }}></i></span><div><h6>{email}</h6></div>
        </li>
        <li style={{ padding: "0.5em 0" }}>
          <span className="fa-li"><i className="fa fa-phone fa-fw mt-4" style={{ color: "#FF851B" }}></i></span><div dangerouslySetInnerHTML={{ __html: sanitizer(phoneNumber) }}></div>
        </li>
      </ul>

    ))}
  </div >



  const SugestedTrips =
    <div className="mb-4 shadow-box footer-suggested-trips">
      <h5 style={{ borderBottom: "1px solid #B0CEDB", textAlign: "center" }}>Suggested locations <br></br> country and international</h5>

      <ul className="fa-ul footer-list">
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Warszawa</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Białystok</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Gdańsk</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Międzyzdroje</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Wrocław</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Karpacz</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Zakopane</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Kraków</li>
      </ul>

      <ul className="fa-ul footer-list">
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Berlin</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Kopenhaga</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Praga</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Wiedeń</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Budapeszt</li>
        <li><span className="fa-li"><i className="fa fa-check"></i></span>Wilno</li>
      </ul>


    </div>

  return (
    <footer>
      <Container fluid={true} className="footer shadow-box pt-3" >

        {SugestedTrips}
        {contactSection}

        <NavLink className="footer-logo" href="/"><img src="/main.png" width="100%" alt="" /></NavLink>


        <Container fluid={true} className="author-footer">
          © 2020 Travel Agency Page. All rights reserved. Designed by Wiktor Kujawa
      </Container>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  contacts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
});


export default connect(mapStateToProps,
  null)(Footer);

