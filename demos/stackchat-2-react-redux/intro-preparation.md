We're so close to perfection! At this point, `redux` has considerably simplified our ability to manage state by offering a single source of truth for the entire app and a friendly API for `dispatch`ing changes to that source of truth. 

However, there are still some annoyances lingering about - namely all of those container components we've written. For example, needing to use `store.subscribe` and `store.unsubscribe` all the time seems like cruft, right? We've also written `import store from ../store` so many times that my fingers are getting cramped. I suppose there are worse fates, but you know what they say - `a clean codebase is a maintainable codebase`.

They don't say that? _Well they should!_

Anyway, there's an extremely helpful little library called [`react-redux`](https://github.com/reactjs/react-redux) that's going to help us clean up our code considerably! And when I say little, I mean **little**. It's actually just **one function** - a function called `connect`! However, the `connect` function is going to help us write some amazing code. 

* I recommend reading [this section](http://redux.js.org/docs/basics/UsageWithReact.html) of the `redux` docs to learn how to use `connect` so that you can hit the ground running. 
* Additionally, the next section of this pre-reading contains a comprehensive example of how the `connect` function works (and how it will simplify our lives). I hope that you read it as well!
* Finally, we'll end up using a useful Redux function called `combineReducers`, which I recommend reading about [here](http://redux.js.org/docs/api/combineReducers.html)