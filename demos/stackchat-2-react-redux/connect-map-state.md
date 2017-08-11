Now that `ChannelList` is connected, let's see what it means to "map state to props".

1. Map the channels field on state to a prop that we give to `ChannelList`
<br/><br/>
<hint title="Solution">
```js
const mapStateToProps = function (state) {
  return {
    channels: state.channels
  };
};
```
</hint>
<br/>
2. Map the messages field on state to a prop that we give to `ChannelList`
<br/><br/>
<hint title="Solution">
```js
const mapStateToProps = function (state) {
  return {
    channels: state.channels,
    messages: state.messages
  };
};
```
</hint>
<br/>
Now, our `ChannelList` component will be re-rendered with the channels and messages values from our state whenever either of them change. This means we can use them to calculate the view!
<br/><br/>
3. In the `ChannelList` dumb component, use the channels array (available on props) to map out a list of `<li>` elements to match what we had before.
<br/><br/>

<hint title="Solution xxxxx">
In the ChannelList component:

```js
function ChannelList (props) {
  return (
    <ul>
      {
        props.channels.map(channel => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`} activeClassName="active">
                <span># {channel.name}</span>
                <span className="badge">{/* number of messages calculation goes here */}</span>
              </NavLink>
             </li>
          )
        })
      }
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}
```

</hint>
<br/>
4. In the `ChannelList` dumb component, use the messages array (available on props) to re-implement the message counter next to each channel.
<br/><br/>
<hint title="Solution">
In the ChannelList component:

```js
function ChannelList (props) {
  return (
    <ul>
      {
        props.channels.map(channel => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`} activeClassName="active">
                <span># {channel.name}</span>
                <span className="badge">{props.messages.filter(message => message.channelId === channel.id).length}</span>
              </NavLink>
             </li>
          )
        })
      }
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}
```

</hint>

**Try it out!** The channels should appear again, and adding new messages should update the counter for that channel!

<p style="color:red;font-weight:bold">Wait up! Something's broken!</p> You might notice that channels in the sidebar no longer switch to their `activeClassName` when you select them - that stinks! We'll learn why this is happening and fix it shortly - move on in the meantime.

<guide>
Everything should work they way it did when we started (except for the bug mentioned above). Only now, we're using real data!
</guide>