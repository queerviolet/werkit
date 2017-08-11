Now that we can handle adding a new channel with Redux, let's get down to connecting our component!

When you open `NewChannelEntry.js`, you'll notice that it is a clean, "dumb", functional component. Part of our goal in using `connect` is to keep it that way. In fact, let's keep two goals in mind:

**1. Maximize the number of functional components in our code (they are the easiest to understand, and the most re-usable)**

**2. Minimize the number of times we directly import and use the store**

That first point should be pretty familiar (think Tom's Second Law)! The second point may be a little strange though - we've been directly using `store.dispatch` a lot. However, now that we have `connect`, we can avoid using the `store` directly most of the time. This is a good rule to follow, because it enforces a stricter `separation of concerns` that will make our code easier to navigate. Think of it this way - instead of dirtying our hands by using the store, we delegate that responsibility to connect.

*"But wait"*, you ask - *"how are we supposed to dispatch actions from our components without writing methods on them?"*

I'm so glad you asked - the answer is to use `mapDispatchToProps`!

`mapDispatchToProps` is the second argument we pass to `connect`. Just like `mapStateToProps`, it's a function that returns an object, and any key-value pairs on that object will become available as props on the connected component.

However, *unlike* `mapStateToProps`, a `mapDispatchToProps` function receives the `dispatch` method as the first argument, rather than `state`. We can use the dispatch method here to implement our methods (like click/submit/change handlers)!

**Example:**

```js
// receives dispatch as an argument
const mapDispatchToProps = function (dispatch) {
  return {
    someMethod: function () {
      dispatch(someActionCreator())
    };
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    someStuff: state.someStuff
  }
}

// receives the props that mapStateToProps and mapDispatchToProps define
function SomeComponent (props) {
  return (
    <div>
      <h5>{ props.someStuff }</h5> {/* props.someStuff comes from mapStateToProps */}
      <button onClick={props.someMethod}>Click Me</button> {/* props.someMethod comes from mapDispatchToProps */}
    </div>
  )
}

const SomeContainer = connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

<guide>
You have read and understood the above
</guide>