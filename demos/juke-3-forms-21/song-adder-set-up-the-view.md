Here's the JSX for a nice song-selecting component:

```js
  <div className="well">
    <form className="form-horizontal" noValidate name="songSelect">
      <fieldset>
        <legend>Add to Playlist</legend>
        <div className="form-group">
          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
          <div className="col-xs-10">
            <select className="form-control" name="song">
              <option value={/**SONGID_GOES_HERE*/}>song name</option>
              <option value={/**SONGID_GOES_HERE*/}>another song name</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">Add Song</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
```

Go ahead and render it out beneath the list of songs in the single `Playlist` component. It should look something like the picture below:

<img src="http://i.imgur.com/dAaHii1.png">

<guide>
The "add song" form renders with the dummy data
</guide>