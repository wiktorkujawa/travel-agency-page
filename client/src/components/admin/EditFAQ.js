import React, { useEffect, useState } from 'react';
import {
  ListGroup, ListGroupItem, Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion, updateQuestion, addQuestion } from '../../actions/questionActions';
import PropTypes from 'prop-types';

const ChangeQuestion = ({ getQuestions, deleteQuestion, questions, updateQuestion }) => {
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
            <ListGroupItem className="mt-5" style={{ borderRadius: "20px", textAlign: "center", fontStyle: "italic" }}>FAQ section will be finished soon</ListGroupItem>
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
                    <Label for="question">Question</Label>
                    <Input
                      type="text"
                      name="question"
                      id="question"
                      defaultValue={question}
                      placeholder="Add question..."
                      onChange={onChange(questionName, index)}
                    />
                    <Label for="answer">Answer</Label>
                    <Input
                      type="textarea"
                      name="answer"
                      id="answer"
                      defaultValue={answer}
                      placeholder="Add answer..."
                      onChange={onChange(questionName, index)}
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
          ))}
      </TransitionGroup>
    </ListGroup>
  );
}

const AddQuestion = ({ addQuestion }) => {

  const [modal, setModal] = useState(false);
  const [questionName, setQuestionName] = useState({
    question: '',
    answer: ''
  });


  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setQuestionName({
      ...questionName,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { question, answer } = questionName;

    const newQuestion = {
      question,
      answer
    }

    // Add question via addQuestion action
    addQuestion(newQuestion);

    // Close modal
    toggle();
  }
  return (
    <div>
      <Button
        color="info"
        size="md"
        onClick={toggle}
        style={{ zIndex: "1000" }}
      >Add question
          </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add new question</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="question">Question</Label>
              <Input
                type="text"
                name="question"
                id="question"
                placeholder="Add question..."
                onChange={onChange}
              />
              <Label for="answer">Answer</Label>
              <Input
                type="text"
                name="answer"
                id="answer"
                placeholder="Add answer..."
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Add question and answer
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

ChangeQuestion.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  questions: state.question.questions
});

export default {
  AddQuestion: connect(
    mapStateToProps,
    { addQuestion }
  )(AddQuestion),
  ChangeQuestion: connect(
    mapStateToProps,
    { getQuestions, deleteQuestion, updateQuestion }
  )(ChangeQuestion)
}