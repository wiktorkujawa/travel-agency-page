import React, { useEffect, useState, Fragment } from 'react';
import {
  Button, Form,
  FormGroup,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { getContent, updateContent } from '../../actions/contentActions';
import PropTypes from 'prop-types';

const About = ({ getContent, contents, updateContent }) => {
  const [Content, setContent] = useState({});

  useEffect(() => {
    getContent()
  }, [getContent])

  useEffect(() => {
    const createArray = () => {
      setContent(...contents);
    };
    createArray();
  }, [contents]);


  const onChange = (event) => {

    const { name, value } = event.target;

    setContent(prev => ({
      ...prev, [name]: value
    }));
  }

  const onSubmit = (id) => {
    return (event) => {
      event.preventDefault();
      const { name } = Content;
      const newItem = {
        name
      }
      // Add content via addItem action
      updateContent(id, newItem);
    }
  }


  return (

    <Fragment>
      {contents.map(({ _id, name }) => (
        <Form onSubmit={onSubmit(_id)}
        >
          <FormGroup>
            <Input
              type="textarea"
              name="name"
              id="content"
              defaultValue={name}
              placeholder="Add content(using html allowed)"
              onChange={onChange}
            />
            <Button
              color="dark"

              block>
              Change content
                </Button>
          </FormGroup>
        </Form>
      ))}
    </Fragment>

  );
}

About.propTypes = {
  getContent: PropTypes.func.isRequired,
  contents: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  contents: state.content.contents,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getContent, updateContent }
)(About);