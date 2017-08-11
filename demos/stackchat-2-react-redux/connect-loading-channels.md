First, let's get our list of channels from the server (right now, we're still using hardcoded data).

<ol>

<li> Open `Main.js` </li>
<li> Import your "fetch channels" thunk creator </li>
<li> In the `componentDidMount` of the `Main` component, dispatch a thunk for fetching the channels (this is in addition to dispatching the thunk to get messages that's already there). It's totally fine to dispatch the thunks separately - it doesn't matter who gets there first </li>

<hint title="Solution">
Your `componentDidMount` should look something like this:
```js
  componentDidMount () {
    const messagesThunk = fetchMessages();
    const channelsThunk = fetchChannels();
    store.dispatch(messagesThunk);
    store.dispatch(channelsThunk);
  }
```
</hint>

<br/>
At this point, whenever your app loads, you'll fetch all of the messages *and* channels and put them in the store. Now that the channels are in the store, we can use them!

</ol>

<guide>
You have completed the steps above
</guide>