import React, { useEffect, useState, Fragment } from 'react';
import {
  Button, Form,
  FormGroup,
  Input,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { getInsurance, updateInsurance } from '../../actions/insuranceActions';
import PropTypes from 'prop-types';

const Insurance = ({ getInsurance, insurances, updateInsurance }) => {
  const [Insurance, setInsurance] = useState('');
  const [fileData, setFileData] = useState(null);

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
      }
      else {
        const newInsurance = { name };

        // Update insurance via addInsurance action
        updateInsurance(id, newInsurance);
      }
    }
  }


  return (
    <Fragment>
      {insurances.map(({ files_id, name }) => (

        <Form onSubmit={onSubmit(files_id)}
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
              Zmień
                </Button>
          </FormGroup>
        </Form>
      ))}
    </Fragment>
  );
}

Insurance.propTypes = {
  getInsurance: PropTypes.func.isRequired,
  insurances: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  insurances: state.insurance.insurances
});

export default connect(
  mapStateToProps,
  { getInsurance, updateInsurance }
)(Insurance);