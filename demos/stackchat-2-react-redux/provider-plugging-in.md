Remember how I said `connect` is the only thing that the `react-redux` library gives us? I sort of lied. There is _one more thing_ that `react-redux` gives us, but it's just a bit of boilerplate code to make our lives easier.

This boilerplate code is a component called `Provider`. It goes at the _very top_ of our component hierarchy and accepts our `store` as a prop. All it does is it puts the `store` onto a _slightly magical_ React thing called [context](https://facebook.github.io/react/docs/context.html). Here's what it looks like:

```js
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
```

`Context` is essentially like a [global variable](https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/global_variables.png) for our React app, which will make the store available in all of our child components as `this.context.store`. 

*I know, I know*, **I know** - here's the thing though: the `connect` method needs the store to work, so if it doesn't find it on context, then it's going to need it passed as a prop every time we use `connect`. And that's fine, but it's also a pain. We've done a lot of typing, so we deserve a little magic.

**NOTE:** The `connect` method is allowed to grab the store from context, but I strongly urge you not to do this yourself. If you find yourself accessing the store from context yourself, you are probably doing something wrong - we'll see that `react-redux` gives us an interface to the store via `mapStateToProps`.

**NOTE 2:** Seriously, don't try to use context in any other way than this. This is the only time you're allowed to use context. Ever.

<guide>
You have read *and understood* the above
You have acknowledged the evils of global variables, but are okay with just this once and never again
</guide>