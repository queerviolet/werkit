Now that we know how `combineReducers` works, let's refactor `store.js` so that instead of a single `store.js`, we have a `store/` directory that contains multiple sub-reducers, and combines them all in an `index.js`. You should have a sub-reducer for each slice of state.

Here's what it might look like:

<hint title="store directory">
```
client/
  store/
    channels.js
    index.js
    messages.js
    name.js
    newChannelEntry.js
    newMessageEntry.js
```
</hint>

If you would like an example to get started, here's what `messages.js` and `index.js` might look like:

<hint title="messages.js">

Note how in the sub-reducer, the `state` is actually the messages array itself! `combineReducers` does all the work of putting together our big "state" object together.

<pre>
import axios from 'axios';
import socket from '../socket';

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS

export function getMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

export function fetchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      });
  };
}

export function postMessage (message) {

  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  };
}

// REDUCER

export default function messagesReducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case GET_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  }

}

</pre>
</hint>
<hint title="index.js">
```js
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';

const reducer = combineReducers({
  messages
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

```
</hint>

Try the rest on your own!

Also, can you make it so that you don't need to refactor all of the files that use our action creators?

<hint title="Approach">
Did you know that you can `export` the exports of another module?

For example, in `store/index.js`, if you say `export * from './messages'`, this will cause `index.js` to export all of the functions that `messages.js` exports! Whoa!

Following the example above, this means `index.js` would look like:

```js
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';

const reducer = combineReducers({
  messages
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

// store is exported by default
export default store;

// ...but we also export everything from messages!
export * from './messages';
```
</hint>