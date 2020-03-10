import React, { useEffect, useState } from 'react';
import {
  ListGroup, ListGroupItem, Button, Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion, updateQuestion } from '../../actions/questionActions';
import PropTypes from 'prop-types';

const QuestionPage = ({ getQuestions, deleteQuestion, questions, updateQuestion }) => {

  const [questionName, setQuestionName] = useState({});

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  useEffect(() => {
    const createArray = () => {
      const newNames = questions.map(question => question);
      setQuestionName({ ...newNames });
    };
    createArray();
  }, [questions]);

  const onChange = (question, index) => {
    return (event) => {
      const { name, value } = event.target;
      setQuestionName(prevObjs => ({ ...prevObjs, [index]: { ...question[index], [name]: value } }));
    }
  }

  const onSubmit = (id, index) => {
    return (event) => {
      event.preventDefault();
      const { question, answer } = questionName[index];
      const newQuestion = {
        question,
        answer
      }
      // Add question via addQuestion action
      updateQuestion(id, newQuestion);
    }
  }

  const onDeleteClick = id => {
    deleteQuestion(id);
  };



  return (
    <ListGroup>
      <TransitionGroup>
        {!(Array.isArray(questions) && questions.length) ?
          < CSSTransition timeout={500} classNames="fade" >
            <ListGroupItem style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }}>Sekcja FAQ zostanie uzupełniona wkrótce</ListGroupItem>
          </CSSTransition>
          : questions.map(({ _id, question, answer }, index) => (
            < CSSTransition key={_id} timeout={500} classNames="fade" >
              <ListGroupItem style={{ borderRadius: "20px" }} className="content-margin" key={_id}>
                <Form onSubmit={onSubmit(_id, index)}
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
                    <Label for="question">Pytanie</Label>
                    <Input
                      type="text"
                      name="question"
                      id="question"
                      defaultValue={question}
                      placeholder="Dodaj pytanie..."
                      onChange={onChange(questionName, index)}
                    />
                    <Label for="answer">Odpowiedź</Label>
                    <Input
                      type="textarea"
                      name="answer"
                      id="answer"
                      defaultValue={answer}
                      placeholder="Dodaj odpowiedź..."
                      onChange={onChange(questionName, index)}
                    />
                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block>
                      Zmień pytanie lub odpowiedź
                </Button>
                  </FormGroup>
                </Form>
              </ListGroupItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </ListGroup>
  );
}

QuestionPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  questions: state.question.questions
});

export default connect(
  mapStateToProps,
  { getQuestions, deleteQuestion, updateQuestion }
)(QuestionPage);