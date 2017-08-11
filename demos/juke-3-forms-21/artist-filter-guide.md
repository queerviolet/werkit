You should be equipped with the knowledge you need to implement the filter. Try doing it on your own first! If you get stuck or want more guidance though the process, here are some steps to ground you:

<ol>
<li> In your `index.js`, instead of rendering `Artists` when the url is `/artists`, render the `FilterableArtistsContainer`.
</li>

<hint title="Solution">
<pre>
&ltRoute path="/artists" component={FilterableArtistsContainer} />
</pre>
</hint>

<li> The `FilterableArtistsContainer` itself should render both the `FilterInput` and `Artists` components.
</li>
<hint title="Solution">
<pre>
// In FilterableArtistsContainer.js
render () {
  return (
    &ltdiv>
      &ltFilterInput />
      &ltArtists artists={/**TODO**/} />
    &lt/div>
  )
}
</pre>
</hint>

<li> Put a space on the state of the `FilterableArtistsContainer` to contain the current value entered in the input
</li>
<hint title="Solution">
```js
// something like...
this.state = {
  inputValue: ''
}
```
</hint>

<li> Write a method that will collect the input value when the input form changes and set it on state. Pass this down as a prop to the `FilterInput` component and attach it to the appropriate listener.
</li>
<hint title="Solution">
<pre>
// write a method like this in FilterableInputContainer.js:
handleChange (evt) {
  const value = evt.target.value;
  this.setState({
    inputValue: value
  });
}

render () {
  return (
    /** .... */
    &ltFilterInput handleChange={this.handleChange} />
    /** .... */
  )
}

// and then attach like so in FilterInput.js:
&ltinput onChange={props.handleChange} />
</pre>
</hint>

<li> In the render method of `FilterableArtistsContainer`, use the input value to filter the array of artists to pass to the `Artists` component.
</li></ol>
<hint title="Solution">
This solution uses [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
<pre>
render () {
  const inputValue = this.state.inputValue;
  const filteredArtists = this.props.artists.filter(artist =>
    artist.name.match(inputValue));
  return (
    /** ... */
    &ltArtists artists={filteredArtists} />
   /** ... */
  );
}
</pre>
</hint>

<guide>
The input is rendered above the list of artists
Typing into the filter causes the list of artists to become filtered appropriately
</guide>