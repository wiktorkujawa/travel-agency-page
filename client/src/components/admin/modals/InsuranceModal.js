import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { addInsurance } from '../../../actions/insuranceActions';

const InsuranceModal = ({ addInsurance }) => {

  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [Insurance, setInsurance] = useState('');

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeFile = e => {
    setFileData(e.target.files[0]);
  };

  const onChangeText = e => {
    setInsurance({
      ...Insurance,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    const newInsurance = new FormData();

    newInsurance.append('insurance', fileData);

    const { name } = Insurance;

    newInsurance.append('name', name);

    addInsurance(newInsurance);

    setFileData(null);

    // Close modal
    toggle();
  }

  return (
    <div>
      <Button
        color="info"
        size="md"
        onClick={toggle}
        className="slide-modify"
        style={{ zIndex: "1000" }}
      >Initialize Insurance
        </Button>


      <Modal
        isOpen={modal}
        toggle={toggle}
        className="open-offer-modal"
      >
        <ModalHeader toggle={toggle}>Add Insurance</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type="textarea"
                name="name"
                id="name"
                placeholder="Add main info..."
                onChange={onChangeText}
              />

            </FormGroup>
            <CustomInput
              type="file"
              name="photo"
              id="photo"
              multiple
              label="Add insurance image..."
              onChange={onChangeFile}
            />


            <Button
              color="dark"
              disabled={fileData === null}
              style={{ marginTop: '2rem' }}
              block>
              Add Insurance
                </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  insurances: state.insurance.insurances
});

export default connect(mapStateToProps, { addInsurance })(InsuranceModal);