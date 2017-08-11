We want the list of current playlists to show up over in the sidebar. Here's some more JSX to add to your `Sidebar` component (go ahead and put it right beneath the `+ Playlist` button.

```js
<hr />
<ul className="list-unstyled">
  <li className="playlist-item menu-item">
    <Link to="FILL_ME_IN">some playlist</Link>
  </li>
  <li className="playlist-item menu-item">
    <Link to="WHERE_TO_GO">another playlist</Link>
  </li>
</ul>

```
It won't do anything yet, but it should look something like the screenshot below.

<img src="http://i.imgur.com/R3M98E0.png" style="width:200px;height:308px">

<guide>
The sidebar displays the dummy JSX from above
</guide>