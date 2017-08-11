Let's get started by replacing the hardcoded channels in our `ChannelList` with real channels from the server. If you request http://localhost:8080/api/channels, you should receive a JSON list of channels from the server (they match the ones that we've hardcoded in). 

If we want them to show up in our view, we need to store them on our state (just like messages). Let's start out by making room for channels in our Redux store! This will be a great review of all of the concepts we learned yesterday. In `store.js`:

* Add an `action type` to represent getting channels from the server
* Add a field to our `initialState` to represent our list of channels
* Add an `action creator` that creates an action for receiving our channels from the server
* Add a case to our `reducer` that updates our state with the list of channels we get when we dispatch our action
* Finally, add a `thunk creator` that creates a thunk to perform the AJAX request that fetches our channels from the server. The thunk should eventually dispatch our synchronous channel action to the store

For reference, look at the way we currently fetch our list of messages from the server and add them to our store - channels will be very similar.

<hint title="Solution">
You'll eventually end up adding code like this:

<pre>
// action type
const GET_CHANNELS = 'GET_CHANNELS';

// action creator
function getChannels (channels) {
  return {
    type: GET_CHANNELS,
    channels: channels
  };
}

// thunk creator
function fetchChannels () {
  return function (dispatch) {
    axios.get('/api/channels')
      .then(res => res.data)
      .then(channels => dispatch(getChannels(channels)));
  }
}

// initialState
const initialState = {
  messages: [],
  name: '',
  newMessageEntry: '',
  channels: []
}

// reducer
function reducer (state = initialState, action) {
  // etc...

  case GET_CHANNELS:
    return { ...state, channels: action.channels };

  // etc...
}
</pre>
</hint>

<guide>
You have completed the steps above
</guide>