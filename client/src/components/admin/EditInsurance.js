import React, { useEffect, useState, Fragment } from 'react';
import {
  Button, Form,
  FormGroup,
  Input,
  CustomInput,
  ModalBody, Modal, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { getInsurance, updateInsurance, addInsurance } from '../../actions/insuranceActions';
import PropTypes from 'prop-types';

const EditInsurance = ({ getInsurance, insurances, updateInsurance, addInsurance }) => {
  const [Insurance, setInsurance] = useState('');
  const [fileData, setFileData] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getInsurance()
  }, [getInsurance])

  useEffect(() => {
    const createArray = () => {
      setInsurance(...insurances);
    };
    createArray();
  }, [insurances]);

  const onChange = (event) => {

    const { name, value } = event.target;

    setInsurance(prev => ({
      ...prev, [name]: value
    }));

  }

  const onChangeFile = (event) => {
    setFileData(event.target.files[0]);
  };

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();
      const { name } = Insurance;
      if (fileData != null) {
        const newInsurance = new FormData();
        newInsurance.append('insurance', fileData);

        newInsurance.append('name', name);

        // Update insurance via addInsurance action
        updateInsurance(id, newInsurance);
        setFileData(null);
      }
      else {
        const newInsurance = { name };

        // Update insurance via addInsurance action
        updateInsurance(id, newInsurance);
      }
    }
  }

  const toggle = () => {
    setModal(!modal);
  };

  const onInitFile = e => {
    setFileData(e.target.files[0]);
  };

  const onInit = e => {
    setInsurance({
      ...Insurance,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitInit = e => {
    e.preventDefault();

    const newInsurance = new FormData();

    newInsurance.append('insurance', fileData);

    const { name } = Insurance;

    newInsurance.append('name', name);

    addInsurance(newInsurance);

    // Close modal
    toggle();
  }

  const InitInsurance = <div>
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
        <Form onSubmit={onSubmitInit}>
          <FormGroup>
            <Input
              type="textarea"
              name="name"
              id="name"
              placeholder="Add main info..."
              onChange={onInit}
            />

          </FormGroup>
          <CustomInput
            type="file"
            name="photo"
            id="photo"
            multiple
            label="Add insurance image..."
            onChange={onInitFile}
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
  </div>;

  return (
    <Fragment>
      {
        !(Array.isArray(insurances) && insurances.length) ?
          InitInsurance
          :
          insurances.map(({ files_id, name }) => (

            <Form key={files_id} onSubmit={onSubmit(files_id)}
            >
              <FormGroup>
                <Input
                  type="textarea"
                  name="name"
                  id="name"
                  defaultValue={name}
                  placeholder="Add main info..."
                  onChange={onChange}
                />
                <CustomInput
                  type="file"
                  name="insurance"
                  id="insurance"
                  label="Choose insurance certificate image..."
                  onChange={onChangeFile}
                />
                <Button
                  color="dark"
                  block>
                  Change
                </Button>
              </FormGroup>
            </Form>
          ))}
    </Fragment>
  );
}

EditInsurance.propTypes = {
  getInsurance: PropTypes.func.isRequired,
  insurances: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  insurances: state.insurance.insurances
});

export default connect(
  mapStateToProps,
  { getInsurance, updateInsurance, addInsurance }
)(EditInsurance);