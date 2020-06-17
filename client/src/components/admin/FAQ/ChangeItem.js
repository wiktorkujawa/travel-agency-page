import React, { useState } from 'react';
import {
  ListGroupItem, Button, Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteQuestion, updateQuestion } from '../../../actions/questionActions';
import PropTypes from 'prop-types';

const ChangeItem = ({deleteQuestion, updateQuestion, question: {_id, question, answer}}) => {

  const [questionName, setQuestionName] = useState({
    question: question,
    answer:answer
  });

  const onChange = e => {
    const { name, value } = e.target;

    setQuestionName(prev => ({
      ...prev, [name]: value
    }));
  };

  const onDeleteClick = id => {
    deleteQuestion(id);
  };

  const onSubmit = id => {
    // Add question via addQuestion action
    updateQuestion(id, questionName);
  }

  return (
    <div>
      < CSSTransition key={_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
                <Form onSubmit={onSubmit.bind(this,_id)}
                >
                  <FormGroup>
                    <Button
                      style={{
                        position: "absolute",
                        left: "100%",
                        marginLeft: "-2.2rem",
                        marginTop: "-0.8rem"
                      }}
                      color="danger"
                      size="md"

                      onClick={onDeleteClick.bind(this, _id)}
                    >&times;
                  </Button>
                    <Label for="question">Question</Label>
                    <Input
                      type="text"
                      name="question" id="question" placeholder="Add question..." defaultValue={question}
                      onChange={onChange}
                    />
                    <Label for="answer">Answer</Label>
                    <Input
                      type="textarea"
                      name="answer" id="answer" defaultValue={answer} placeholder="Add answer..."
                      onChange={onChange}
                    />
                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block>
                      Change question or answer
                </Button>
                  </FormGroup>
                </Form>
              </ListGroupItem>
            </CSSTransition>
    </div>
  )
}

ChangeItem.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  questions: state.question.questions
});

export default connect(
  mapStateToProps,
  { deleteQuestion, updateQuestion }
)(ChangeItem)