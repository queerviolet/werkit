If you've been reading the React and/or Redux docs, you may have come across a lifecycle hook called [`shouldComponentUpdate`](https://facebook.github.io/react/docs/optimizing-performance.html#avoid-reconciliation), which can yield some massive performance wins for React.

The doc linked to above goes into some great detail about how it works, so I won't cover it too much myself, but the gist is that React components have a lifecycle hook called `shouldComponentUpdate`, which receives the `nextProps` and `nextState` that are passed down to a component when it's about to re-render. If `shouldComponentUpdate` is defined, it will be evaluated before that component re-renders, and if `shouldComponentUpdate` returns `false`, the rendering will be canceled!

This could yield huge benefits. Consider the following (common) situation:
```js
    <SharedStateContainer> // state has three fields: { foo, bar, quux }
    /                    \
<ComponentA>          <ComponentB>
// needs foo and bar   // needs foo and quux
```

If we change the value of `foo` in the SharedStateContainer, then we of course want to re-render both ComponentA and ComponentB. But what if we change the value of `bar`? We need ComponentA to re-render, but why should ComponentB have to re-render as well? It shouldn't!

`shouldComponentUpdate` can compare the current props that ComponentB has, and the nextProps that it will receive when SharedStateContainer re-renders. If we only changed `bar` in our parent's state, then ComponentB would be able to tell that `props.foo === nextProps.foo` `&&` `props.quux === nextProps.quux`, and return `false` in its `shouldComponentUpdate`. Then ComponentB's rendering (as well as the rendering of any of its own children) would be canceled.

This may not seem like much in an example with only a handful of components, but imagine that ComponentA and ComponentB have **hundreds** of child components. You can imagine how much your browser would thank you to not have to re-paint all of them every time!


Okay, are you ready for the best part? **The `connect` method implements `shouldComponentUpdate` for you**. As long as you use `connect`, you get a huge performance boost just for showing up!

Go ahead and high five your partner - that's pretty cool, right?

All that you need to do (and this is something you've already been doing) is make sure that your state is **immutable** - updates to arrays should always perform immutable operations like `concat`, `map` and `filter` (but **never** `push` or `pop`), and updates to objects should always use `Object.assign` with a fresh object literal as the first argument.

If you don't, then this same functionality will bite you. Remember that objects and arrays in JavaScript represent a location in memory, and when you evaluate equality for an object or an array, the `===` operator is actually checking to see if the object or array is referring to the same location in memory, *not* whether their contents are the same.

```js
const array = [];
const sameArray = array;
sameArray.push(1);

array === sameArray; // true! The same array is referenced by both variables!

const differentArray = array.slice();
array === differentArray // false! Array.prototype.slice always returns a new array!
```

This means that if you *mutate* an object or array on your state, your `connect` components will think that nothing has changed (because the address of your current object will be equal to the address of the next object), and they'll prevent your components from re-rendering even though they should!

Moral of the story - don't forget to always treat your state as **immutable**. That, and `connect` is pretty awesome.

<guide>
You have read and understood the above
</guide>