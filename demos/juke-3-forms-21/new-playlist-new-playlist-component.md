<style>
.example-btn {
  background-image: linear-gradient(#8a9196, #7a8288 60%, #70787d);
  background-repeat: no-repeat;
  border-color: rgba(0, 0, 0, 0.6);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  background-color: #7a8288;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
}
.example-btn:hover {
  background-image: linear-gradient(#404448, #4e5458 40%, #585e62);
  background-color: #62686d;
}
</style>

<ol>
<li> Add the following JSX to your `Sidebar` component (right beneath the second pair of `<section>` tags). (N.B. That `<hr />` tag, if you're unfamiliar with it, is just a "horizontal rule" to separate your nav from the button.
</li>

```js
<hr />
<section>
  <h4 className="text-muted">PLAYLISTS</h4>
  <h4>
    <Link className="btn btn-primary btn-block" to={/**todo!*/}>
      <span className="glyphicon glyphicon-plus"></span> PLAYLIST
    </Link>
  </h4>
</section>
```

<li> Create a `Route` and a presentational component for the `NewPlaylist`. The view should include a field for entering the name of the playlist, and also a button for submission. Once you've done so, make sure to `Link` up that <button class="btn example-btn"><i class="fa fa-plus"></i> PLAYLIST</button> button to navigate us there.
</li>

<hint title="Possible JSX">
<pre>const NewPlaylist = function () {
return (
&lt;div className="well"&gt;
  &lt;form className="form-horizontal"&gt;
    &lt;fieldset&gt;
      &lt;legend&gt;New Playlist&lt;/legend&gt;
      &lt;div className="form-group"&gt;
        &lt;label className="col-xs-2 control-label"&gt;Name&lt;/label&gt;
        &lt;div className="col-xs-10"&gt;
          &lt;input className="form-control" type="text"/&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div className="form-group"&gt;
        &lt;div className="col-xs-10 col-xs-offset-2"&gt;
          &lt;button type="submit" className="btn btn-success"&gt;Create Playlist&lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/fieldset&gt;
  &lt;/form&gt;
&lt;/div&gt;
)}</pre>
</hint>

<guide>
You have completed steps 1 - 2 above
The "playlist" button renders in the sidebar, and clicking it causes the playlist form to render
</guide>