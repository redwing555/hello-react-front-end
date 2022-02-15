import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

const GET_GREETING_SUCCESS = 'GET_GREETING_SUCCESS';
const GET_GREETING_REQUEST = 'GET_GREETING_REQUEST';

const greetingSuccess = (json) => ({
  type: GET_GREETING_SUCCESS,
  json,
});

const getGreeting = () => async (dispatch) => {
  dispatch({ type: GET_GREETING_REQUEST });
  const response = await fetch('https://random-greeting-api.herokuapp.com/api/v1/messages.json');
  const json = await response.json();
  return dispatch(greetingSuccess(json));
};

const Greeting = ({ greeting, getGreeting }) => {
  const greetingMessage = greeting.map((message) => <div className="message" key={uuid()}>{message.greeting}</div>);

  return (
    <>
      <button type="button" onClick={() => getGreeting()}>Generate random greeting</button>
      <div>{greetingMessage}</div>
    </>
  );
};

const structuredSelector = createStructuredSelector({
  greeting: (state) => state.greeting,
});

const mapDispatchToProps = { getGreeting };

Greeting.propTypes = {
  greeting: PropTypes.instanceOf(Array).isRequired,
  getGreeting: PropTypes.func.isRequired,
};

export default connect(structuredSelector, mapDispatchToProps)(Greeting);
