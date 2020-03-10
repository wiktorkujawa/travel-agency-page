import React, { useEffect } from 'react';
import {
  Container, ListGroup, ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getContent } from '../actions/contentActions';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const About = ({ getContent, contents }) => {
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    getContent()
  }, [getContent])

  return (
    <Container fluid={true} className="content-wrap">
      <ListGroup className="mb-5">
        <TransitionGroup>
          {contents.map(({ _id, name }) => (
            < CSSTransition key={_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" >
                <div dangerouslySetInnerHTML={{ __html: sanitizer(name) }}></div>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

About.propTypes = {
  getContent: PropTypes.func.isRequired,
  contents: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  contents: state.content.contents
});

export default connect(
  mapStateToProps,
  { getContent }
)(About);