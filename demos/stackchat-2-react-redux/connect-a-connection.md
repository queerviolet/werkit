The moment of truth is at hand! Get ready to write your first `connect` component using `react-redux`. If you haven't had the chance yet, read [this page of the redux docs](http://redux.js.org/docs/basics/UsageWithReact.html) to familiarize yourself with how `connect` works. I'll walk you through this first one step by step.

<ol>

<li> Open `ChannelList.js`</li>
<br/>
<li> Remove all of the `store.subscribe` boilerplate - we're going to replace it with `connect`. You can even re-write the component as a function! Get rid of all that hardcoded data as well - we're going to replace it with REAL data from the store! </li>
<br/>
<hint title="Possible starting point">

We could re-write the ChannelList component to look like this:

<pre>
function ChannelList (props) {
  return (
    &lt;ul>
      &lt;li>
        &lt;NavLink to={"URL_GOES_HERE"} activeClassName="active">
          &lt;span># {/* channel name goes here */}&lt;/span>
          &lt;span className="badge">{/* number of messages calculation goes here */}&lt;/span>
        &lt;/NavLink>
      &lt;/li>
      &lt;li>
        &lt;NavLink to="/new-channel">Create a channel...&lt;/NavLink>
      &lt;/li>
    &lt;/ul>
  );
}
</pre>
</hint>
<br/>
<li> Import `connect` from `react-redux` (remember, it's **not** a default export).</li>
<br/>
<li> Write a function called `mapStateToProps`. It should expect to receive `state` as its first argument, and return an empty object (we'll fill it in later).</li>
<br/>
<hint title="Solution">
```js
const mapStateToProps = function (state) {
  return {};
};
```
</hint>
<br/>
<li> Pass `mapStateToProps` to `connect`. This will return another function - pass the `ChannelList` component to that function. Store the result in a variable called `ChannelListContainer` </li>
<br/>
<hint title="Solution">
Double functions, whoa!
```js
const ChannelListContainer = connect(mapStateToProps)(ChannelList);
```
</hint>
<br/>
What just happened? To get a full understanding, check out the [Example](https://learn.fullstackacademy.com/workshop/591c4d7633a48d0004c39898/content/591c4d7733a48d0004c398a4/text) - but in short, we've wrapped our "dumb" ChannelList component in a "smart" component that's connected to the store! All we need to do now is decide what values we want to get from the store (using the `mapStateToProps` function that we wrote), and we'll be guaranteed to re-render the component with them every time they change!
<br/><br/>
<li> Export the `ChannelListContainer` by default (you may need to remove the `export default` from the original `ChannelList` </li>
<br/>
</ol>

Now, when we render `<ChannelList />` from another component, we're *actually* rendering the smart container, which in turn renders the "dumb" component! Before things work the way they did before though, we need to complete a few more steps - move on to the next section and we'll wrap things up!

<guide>
You have completed the steps above
</guide>