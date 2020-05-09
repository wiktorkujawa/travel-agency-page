import React, { useEffect } from 'react';
import {
  Container, ListGroup, ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion, updateQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';

const QuestionPage = ({ getQuestions, questions }) => {

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  return (
    <Container fluid={true} className="content-wrap">
      <ListGroup className="mb-5">
        <TransitionGroup>
          {!(Array.isArray(questions) && questions.length) ?
            < CSSTransition timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }}>FAQ sections will be finished soon</ListGroupItem>
            </CSSTransition>
            : questions.map(({ _id, question, answer }) => (
              < CSSTransition key={_id} timeout={500} classNames="fade" >
                <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
                  <strong>{`Q:${question}`}</strong>
                  <p>{`A:${answer}`}</p>
                </ListGroupItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

QuestionPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getQuestions, deleteQuestion, updateQuestion }
)(QuestionPage);