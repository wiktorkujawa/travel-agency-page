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
      >Dodaj pytanie
          </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Dodaj nowe pytanie</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="question">Pytanie</Label>
              <Input
                type="text"
                name="question"
                id="question"
                placeholder="Dodaj pytanie..."
                onChange={onChange}
              />
              <Label for="answer">Odpowiedź</Label>
              <Input
                type="text"
                name="answer"
                id="answer"
                placeholder="Dodaj odpowiedź na pytanie..."
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block>
                Dodaj pytanie i odpowiedź
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