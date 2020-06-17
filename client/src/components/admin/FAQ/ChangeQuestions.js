import React, { useEffect } from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions } from '../../../actions/questionActions';
import PropTypes from 'prop-types';
import ChangeItem from './ChangeItem';

const ChangeQuestions = ({ getQuestions, questions }) => {

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  return (
    <ListGroup>
      <TransitionGroup>
        {!(Array.isArray(questions) && questions.length) ?
          < CSSTransition timeout={500} classNames="fade" >
            <ListGroupItem className="mt-5" style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }}>FAQ section will be finished soon</ListGroupItem>
          </CSSTransition>
          : questions.map( question => (
            <ChangeItem question={question}/>
          ))}
      </TransitionGroup>
    </ListGroup>
  );
}
ChangeQuestions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  questions: state.question.questions
});

export default connect(
    mapStateToProps,
    { getQuestions }
  )(ChangeQuestions)