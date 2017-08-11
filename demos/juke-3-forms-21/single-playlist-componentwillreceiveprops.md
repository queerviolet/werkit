Everything else is working, but if you try to switch from playlist to playlist, the component isn't updating. What the heck? 

We're fetching the single playlist in `componentDidMount`, but when we switch from one playlist to another, the component **doesn't** re-mount! Remember that to *mount* means to get placed in the actual DOM - since the component is already in the DOM, React doesn't throw it away and mount it again.

We can address this several ways - let's solve the problem by introducing a new lifecycle hook - [`componentWillReceiveProps`](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops). Using this lifecycle hook, we can compare our current props with the next props the component will receive. For example, we could check and see if the playlist id we're receiving is different from the one we had before and, if so, we could fetch the new playlist and put it on state.

**Be careful** - we need to make sure that we only fetch and re-set the playlist when the id changes. Otherwise, we could end up in an infinite loop!

And keep in mind that we're not *replacing* our `componentDidMount`. We still need that for the initial load, because `componentWillReceiveProps` will not work effectively for this case.

Give it a go! Remember to only check the hint if you get stuck. You'll know you've succeeded when the view updates appropriately when you switch from playlist to playlist.

<hint title="Solution">
```js
  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.routeParams.playlistId;
    const currentPlaylistId = this.props.routeParams.playlistId;
    const selectPlaylist = this.props.selectPlaylist;
    if (nextPlaylistId !== currentPlaylistId)
      selectPlaylist(nextPlaylistId);
  }
```
</hint>

<guide>
Switching between different playlists causes the correct playlists to be rendered each time
</guide>