Using the JSX below as a starting point, go ahead and build out a single playlist component.

```html
<div>
  <h3>{ playlist.name }</h3>
  <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
  <hr />
</div>
```

Try to get it so that clicking on a playlist from the sidebar will display the appropriate playlist. It's tricky though - here's another guide to help you on your way:

<ol>
<li> Create a new parameterized `Route` for the single `Playlist` component.
</li>

<hint title="Solution">
<pre>
&ltRoute path="playlists/:playlistId" component={Playlist} />
</pre>
</hint>

<li> Update the `Link`s in the `Sidebar` to direct you to the appropriate playlist.
</li>

<hint title="Solution">
<pre>
{
  playlists.map(playlist => {
    return (
      &ltli key={playlist.id} className="playlist-item menu-item">
        &ltLink to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
      &lt/li>
    );
  })
}
</pre>
</hint>

<li> Add a new field to our `initialState.js` to handle our "selected playlist".
</li>

<hint title="Solution">
```js
{
  selectedPlaylist: {}
}
```
</hint>

<li> Write a method that will receive the playlist's id, fetch the playlist from the server, and set it on state as the selected playlist. Don't forget that each song in the playlist's songs field will have to be converted by the `convertSong` method!
</li>

<hint title="Solution">
<pre>
  selectPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        this.setState({
          selectedPlaylist: playlist
        });
      });
  }
</pre>
</hint>

<li> Use the method above when the single `Playlist` component mounts to set the appropriate component on state. It should get the playlist id from the `routeParams`, just like the singular `Artist` and `Album` components.
</li>
</ol>

<hint title="Solution">
<pre>
componentDidMount () {
  const playlistId = this.props.routeParams.playlistId;
  const selectPlaylist = this.props.selectPlaylist;
  selectPlaylist(playlistId);
}
</pre>
</hint>

If you get to this point and spend some time testing, you may notice a peculiar issue when switching *between* playlists - it doesn't seem to update! Move on to the next action and let's see what's going on here.

<guide>
Clicking a playlist name in the sidebar renders the playlist appropriately
You may encounter a bug when navigating between playlists - this is okay
</guide>