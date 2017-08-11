Say that we want to take a combined approach where we keep local form data in a React component's state, and manage our application's data in our `redux` store. Here is how we might combine our three types of components. Consider the following simple form:

**With no user submitted**
<div>
<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/no-duke.png"/>
</div>
**After submitting a user**
<div>
<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/duke.png"/>
</div>

In this example, our `redux` store will hold the `user`, but the data in the field will be held by a stateful React component.

1. A `connect` component written with `react-redux`, which exposes a way to `dispatch` changes to the `redux` store
2. A stateful React class that manages local form data
3. A stateless functional React component that displays the UI and connects event listeners

**Container.js**
```js
import { connect } from 'react-redux';
import { submitLoginActionCreator } from '../action-creators';
import StatefulFormClass from './StatefulFormClass';

const mapStateToProps = state => {
  return {
    // our main state.user
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatches a change to our central `state.user` in the redux store
    submitLogin (userName) {
      dispatch(submitLoginActionCreator(userName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatefulFormClass);
```

**StatefulFormClass.js**
```js
import React, { Component } from 'react';
import StatelessForm from './StatelessForm';

export default class StatefulFormClass extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      inputValue: '' // the entered user name
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // updates our local state when the input form is changed
  handleChange (evt) {
    evt.preventDefault();
    this.setState({
      inputValue: evt.target.value
    });
  }
 
  // takes our local inputValue and passes it to the method from our connect component, 
  // which has access to `dispatch`
  handleSubmit (evt) {
    evt.preventDefault();
    this.props.submitLogin(this.state.inputValue);
  }
  
  render () {
    // passes down the local methods and inputValue, as well as the `user` from the store
    return (
      <StatelessForm 
        user={this.props.user}
        inputValue={this.state.inputValue}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />  
    );
  }
}
```

**StatelessForm.js**
```js
import React, { Component } from 'react';

export default function (props) {
  
  // a prop from our redux store
  const user = props.user; 
  
  // props from our local stateful component
  const inputValue = props.inputValue; 
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  
  return (
    <div>
    
      { user ? <h3>You are already logged in: { user }</h3> : null }
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your name</label>
        <input value={inputValue} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}
```