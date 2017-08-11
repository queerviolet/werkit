Let's start connecting `NewChannelEntry`!

<ol>
<li> Import `connect` into `NewChannelEntry.js`</li>
<br/>
<li> Write `mapStateToProps` and `mapDispatchToProps` functions (return empty objects for now). Pass these to `connect`, and then pass in the NewChannelEntry component to create the container. Export the container by default.</li>
<br/>
<hint title="Solution">
```js
const mapStateToProps = function (state) {
  return {};
};
const mapDispatchToProps = function (dispatch) {
  return {};
};

const Container = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);
export default Container;
```
</hint>

<br/>
Now that we're set up, let's map some state to props.

<li> Map the value of the channel input from our state to be a prop for the `NewChannelEntry` component </li>
<br/>
<hint title="Solution">
```js
const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry
  };
};
```
</hint>
<br/>
<li> Pass the input value from state in as the `value` prop for the `<input>` element in the component. Remember that this makes our `<input>` a "controlled" component. </li>
<br/>
</ol>
<hint title="Solution">
<pre>
&lt;input
  value={props.newChannelEntry}
  className="form-control"
  type="text"
  name="name"
  placeholder="Enter channel name"
/>
</pre>
</hint>

<guide>
You have completed the steps above
</guide>