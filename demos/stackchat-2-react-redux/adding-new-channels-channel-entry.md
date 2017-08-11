Our goal is to fill out a form with a channel's name and submit it to post a new channel. We should model this behavior out in Redux (in `store.js`) before we worry about our view components. 

By now, this should start to feel familiar - feel free to give it a shot on your own! The process will be very similar to posting new messages, so you can use that code as a reference. If you want some more guidance, open the hint below - it will advise you on the different ingredients you need to make.

<hint title="Guidebook">
* Add a field to state for the value of the channel entry input field
* Write an action type and an action creator for writing a channel name into the input
* Write an action type and an action creator for receiving a new channel from the server
* Add cases to your reducer for handling the two actions above
* Write a thunk that will post a new channel to the server, and then dispatch the action for adding a new channel to our array of channels. To post a new channel on the server, we need a request body that includes the `name` of the new channel
</hint>
<br/>
<hint title="Solution">
You will likely end up with new code like this in your `store.js`:

```js
// action types
const WRITE_CHANNEL_NAME = 'WRITE_CHANNEL_NAME';
const GET_CHANNEL = 'GET_CHANNEL';

// action creators
export function writeChannelName (channelName) {
  const action = { type: WRITE_CHANNEL_NAME, channelName };
  return action;
}

export function getChannel (channel) {
  const action = { type: GET_CHANNEL, channel };
  return action;
}

// thunk creator
export function postChannel (channel) { // expecting channel to an object like: { name: 'new_channel_name' }

  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(function (res) { return res.data })
      .then(function (newChannel) {
        dispatch(getChannel(newChannel));
      });
  };
}

function reducer (state = initialState, action) {
  // etc...
    case WRITE_CHANNEL_NAME:
      return {
        ...state,
        newChannelEntry: action.channelName
      };

    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      };

  // etc...
}

```
</hint>

<guide>
You have added the necessary functionality to `store.js`
</guide>