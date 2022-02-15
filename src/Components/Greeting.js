import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './greeting.css';

const GET_GREETING_SUCCESS = 'GET_GREETING_SUCCESS';
const GET_GREETING_REQUEST = 'GET_GREETING_REQUEST';

 const getGreeting = () => {
  return async (dispatch) => {
    dispatch({ type: GET_GREETING_REQUEST });
    try {
      const response = await fetch('api/v1/messages.json');
      const json = await response.json();
      return dispatch(greetingSuccess(json));
    } catch (error) {
      console.log(error);
    }
  };
}

const greetingSuccess = (json) => {
  return {
    type: GET_GREETING_SUCCESS,
    json,
  };
}
const Greeting = (props) => {

    const { greeting } = props;
    const greetingMessage = greeting.map((message, i) => <div className="message" key={i}>{message.greeting}</div>);

    return (
      <>
        <button onClick={() => props.getGreeting()}>Generate random greeting</button>
        <div>{greetingMessage}</div>
      </>
    );
  
}

const structuredSelector = createStructuredSelector({
  greeting: (state) => state.greeting,
});

const mapDispatchToProps = { getGreeting };

export default connect(structuredSelector, mapDispatchToProps)(Greeting);