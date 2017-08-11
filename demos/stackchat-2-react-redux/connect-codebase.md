With that little bit of unpleasantness behind us, let's get to the goods!

First, let's re-familiarize ourselves with the codebase - it may be a bit different than what you ended up with yesterday. In particular, check out:

1. `Main.js` - a new Route has been added here to render the new channel entry view. Also note that we are now using the `componentDidMount` hook in `Main.js` to fetch all of our messages, rather than the one in `MessagesList.js`. This is because we always want to update the message counter next to each channel name in the sidebar whenever the app loads. If we only fetched all messages when `MessagesList` loaded, we would not have them if we refreshed the page while looking at the "new-channel" Route.
2. `NewChannelEntry.js` - this is our form for entering new channels
3. `ChannelList.js` - this is our hardcoded list of channels that we're going to replace
4. `store.js` - make sure that you remember how the store is organized
5. `server/socket.js` - a new listener has been added for channels! We'll want this later!

<guide>
You have reviewed at least the components above
</guide>