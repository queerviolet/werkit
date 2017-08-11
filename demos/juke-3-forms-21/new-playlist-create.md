Instead of logging upon form submission, let's actually create a new playlist. Go ahead and write this method on the `NewPlaylistContainer` for now (we'll be moving it shortly, though). You'll need to make your first `POST` request using axios. This is as easy as saying `axios.post`:


```js
axios.post('/api/route/to/post/to', { /** req.body contents go here! */ })
  .then(res => res.data)
  .then(result => {
    console.log(result) // response json from the server!
  });
```

When you're done you should be able to create playlists that persist to the backend. You can confirm by visiting http://localhost:1337/api/playlists. Also, your front end should do something with the returned playlist — perhaps log it out.

<guide>
You can confirm via /api/playlists that clicking the submit button causes a new playlist to be created in the database 
</guide>