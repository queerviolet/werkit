Now we need to make sure that when our app loads, we fetch all of the playlists from the server, and also make it so that the list is updated when we add a new playlist. Go ahead and try it yourself, but here are some steps to guide you if you need to check your bearings:

<ol>
<li> Set aside a slice of state in our `initialState.js` to hold an array of playlists.
</li>

<hint title="Solution">
```js
{
  playlists: []
}
```
</hint>

<li> In `AppContainer`, make an additional call to the server to fetch all of the playlists and set them on state (this can be done in the same place that we're currently fetching all of the albums and artists).
</li>

<hint title="Solution">
In our `AppContainer`'s `componentDidMount`, we will want to make an `axios.get('/api/playlists')` request, and then `setState` with the resultant array of playlists.
</hint>


<li> Update the `Sidebar` component to iterate over each playlist and render out each one (don't worry about making the `Link` go anywhere special yet).
</li>

<hint title="Solution">
<pre>
{
  playlists.map(playlist => {
    return (
      &ltli key={playlist.id} className="playlist-item menu-item">
        &ltLink to="FILL_ME_IN">{playlist.name}&lt/Link>
      &lt/li>
    );
  })
}
</pre>
</hint>


<li> The above steps should get the playlists to appear in the `Sidebar`. To update the list when we create a new playlist, we need to move the method that makes the `POST` request from our `NewPlaylistContainer` to our `AppContainer`, so that we can update the playlists on our state when our request resolves.
</li>

<hint title="Solution">
<pre>
// we want something like...
  addPlaylist (playlistName) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        });
      });
  }
</pre>
</hint>

<li> We can then pass that method down as a prop to our `NewPlaylistContainer` so that it can invoke it when the submit handler is triggered.
</li>
</ol>
<hint title="Solution">
Remember that from our `AppContainer`, we need to pass props down manually via `React.cloneElement`. We need to add the method above to the "props" object that we pass in as the second argument to `React.cloneElement`. Then it will be available as a prop in `NewPlaylistContainer`, where we can invoke it in our `handleSubmit`

```js
  handleSubmit (evt) {
    evt.preventDefault();

    const addPlaylist = this.props.addPlaylist;
    addPlaylist(this.state.inputValue);
  }
```
</hint>

<guide>
A list of all playlists you've created appears in your sidebar when you load the app
</guide>