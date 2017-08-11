Now let's work up the behavior that we'll pass to the component.

<ol>
<li> In the object your `mapDispatchToProps` function returns, write a "handleChange" function. This should accept an "event", and dispatch an action to update the input value in the store </li>
</br>
<hint title="Solution">
```js
import { writeChannelName } from '../store';

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeChannelName(evt.target.value));
    }
  };
};
```
</hint>
<br/>
<li>Pass your change handler to the change listener on the `<input>`</li>
<br/>

<hint title="Solution">
<pre>
&lt;input
  value={props.newChannelEntry}
  onChange={props.handleChange}
  className="form-control"
  type="text"
  name="name"
  placeholder="Enter channel name"
/>
</pre>
</hint>

<br/>
When you're done, typing into the input field should update the value in the store!

<guide>
You have completed the steps above
</guide>