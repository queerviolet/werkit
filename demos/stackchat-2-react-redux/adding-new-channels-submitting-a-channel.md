All right - we're very close now. 

<ol>

<li> In your `mapDispatchToProps`, write a submit handler function that you can pass down to the component. It should expect the event object as an argument, and should dispatch our `postChannel` thunk. We have two options for getting the value of the form input - we could use the value that we've stored on state, or we could "cheat" a little bit and grab the value off of the event, which may be quicker for now. Remember that for submit events, you can find the value of any form input by its name on `event.target` (for example, in this case we could find the current value of the input on `event.target.channelName.value`, because our `<input>` in the form has `name="channelName"`. </li>

<br/>

<hint title="Solution">
Here's how we would grab the value off of the event:

```js
import { writeChannelName, postChannel } from '../store';

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeChannelName(evt.target.value));
    },
    handleSubmit (evt) {
      evt.preventDefault();
      const name = evt.target.channelName.value;
      dispatch(postChannel({ name }));  // this is ES6 object destructuring! It's equivalent to { name: name }
    }
  };
};
```
</hint>

<br/>

<li> Attach the submit handler to the `<form>` element. </li>

<br/>

<hint title="Solution">
```js
<form onSubmit={props.handleSubmit}>
```
</hint>

<br/>

**Try it out** - you should see the new channel get added. That being said, it'd be no fun to just chat on this new channel ourselves. Let's make sure to emit this new channel across sockets so that other clients get the new channel as well!

<br/>
<br/>

<li> After we've created the new channel, we want to emit a `'new-channel'` event. This will be very similar to what we've done for new messages. </li>

<br/>

<hint title="Solution">

```js
export function postChannel (channel) {

  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        dispatch(getChannel(newChannel));
        socket.emit('new-channel', newChannel);
      });
  };
}
```
</hint>

<br/>

<li> If you check out `server/socket/index.js`, you'll notice that we're already listening for the `'new-channel'` event, and emitting one back to all other clients. This means that all we need to do now is listen for that event from the client, and update our state with the new channel. Once again, this should be quite familiar. </li>

<br/>

<hint title="Solution">
In `client/socket.js`:
```js
  socket.on('new-channel', channel => {
    store.dispatch(getChannel(channel));
  });
```
</hint>

</ol>

**Try it out again!** Use your partner's machine or another browser tab to test. Now we're rolling in real time!

There are two more improvements we can make, though:

* It would be nice if the field cleared out its value when we submitted...this is an optional exercise for you
* When we create a new channel, it would be really nice to instantly navigate to that new channel. We will do this together in the next section

<guide>
You can create new channels, and these new channels appear across sockets
</guide>