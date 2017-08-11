That being said, `connect` and `shouldComponentUpdate` are the source of our `activeClassName` woes. Here's why:

In `ChannelList.js`, think about the props that we receive: messages and channels. Do either of these change when the url changes from `/channels/1` to `/channels/2`? No, they don't! Because the component doesn't receive any data that changes, the `connect` will be *too* smart and block re-rendering.

Now, what data *does* change when the url changes? The answer is the route props that we get from React Router (`match`, `location` and `history`)! However, those props are only passed from `Route`s down to their `component`s, and `ChannelList` is not rendered by a `Route`.

Fortunately, React Router exposes a nice higher order function that we can use to pass down the the route props to any arbitrary component: [`withRouter`](https://reacttraining.com/react-router/web/api/withRouter). We can use this to pass the route props to `ChannelList` - `connect` will recognize the changing data, and re-render like normal.

* Check out this article in the React Router docs about update blocking (and how to fix it): https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
* Use `withRouter` fix our `activeClassName` bug

<hint title="Solution">
If we wrap our connected component in `withRouter`, the connected component will be aware when the router changes

```js
export default withRouter(connect(mapStateToProps)(ChannelList));
```
</hint>

<guide>
The activeClassName changes appropriately in the channel list again
</guide>