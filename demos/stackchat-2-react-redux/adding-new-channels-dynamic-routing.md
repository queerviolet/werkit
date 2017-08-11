Now, where were we? Oh yes - when we create a new channel, we want to dynamically navigate to that new channel. To do this, we'll learn a little bit more about React Router's [`history`](https://reacttraining.com/react-router/web/api/history) prop.

In addition to `match` and `location`, `history` is one of the three props that every `Route` passes to its `component`. The `history` object is mutable (so use it with care)! We need it here though, because it supports a method (`history.push('pathname')`), which will allow us to dynamically change the value in the URL bar such that everything in our router will re-render.

**Example**:

* If we say `history.push('/new-channel')`, then the url will change to `http://localhost:8080/new-channel`, and the new channel component will be re-rendered.

* If we say `history.push('/channels/1')`, then the url will change to `http://localhost:8080/channels/1`, and the messages list component will be re-rendered.

With this in mind:

* In your `NewChannelEntry`, obtain the `history` prop that the `Route` sends to you
* Use the `history.push` method to update the url *after* the new channel is created

**Note:** when you're done, it may be difficult to tell that it worked because of our `activeClassName` bug! To test it out, send a message to your new channel and make sure that the proper message counter increments!

<hint title="Where is the history object?">
Remember `ownProps` is the second argument to `mapDispatchToProps` and `mapStateToProps`. You'll find it there! 
</hint>

<hint title="More hints">
Thunk creators can take any number of arguments - why not pass `history` along so that you can use it after the channel is created?
</hint>

<hint title="Solution">
You submit handler may change like so. We'll pass down the history object as an additional argument to postChannel:

```js
    handleSubmit (name, evt) {
      evt.preventDefault();
      dispatch(postChannel({ name }, ownProps.history));
      dispatch(writeChannelName(''));
    }
```

And your postChannel thunk creator may be modified to do this, so that it uses history.push after the promise resolves:

<pre>
export function postChannel (channel, history) {

  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        dispatch(getChannel(newChannel));
        socket.emit('new-channel', newChannel);
        history.push(`/channels/${newChannel.id}`);
      });
  };
}
</pre>
</hint>

<guide>
Submitting a new channel switched you to that new channel
</guide>