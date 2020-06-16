import React, { useEffect } from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getAnnouncements } from '../../../actions/announcementActions';
import PropTypes from 'prop-types';
import ChangeItem from './ChangeItem';

const ChangeAnnouncements = ({ getAnnouncements, announcements }) => {

  useEffect(() => {
    getAnnouncements()
  }, [getAnnouncements])

  return (
    <ListGroup>
      <TransitionGroup>
        {!(Array.isArray(announcements) && announcements.length) ?
          < CSSTransition timeout={500} classNames="fade" >
            <ListGroupItem style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }} className="content-margin">
              Temporary no announcements
            </ListGroupItem>
          </CSSTransition>
          : announcements.map(announcement => (
            <ChangeItem announcement={announcement} />        
          ))}
      </TransitionGroup>
    </ListGroup>
  );
}

ChangeAnnouncements.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements
});

export default connect(
    mapStateToProps,
    { getAnnouncements }
  )(ChangeAnnouncements)
