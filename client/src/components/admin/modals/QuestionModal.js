import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../../../actions/questionActions';

const QuestionModal = ({ addQuestion }) => {

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

const mapStateToProps = state => ({
  question: state.question
});

export default connect(mapStateToProps, { addQuestion })(QuestionModal);