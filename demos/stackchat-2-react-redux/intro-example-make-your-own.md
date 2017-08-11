As Dan Abramov (the creator of `redux`) has stressed multiple times, the `redux` library doesn't know anything about `react`. We could use it wherever we wanted - we might use it to simplify stateful web applications built with libraries like `angular` or even `jquery`. 

But since we know we want to use `react`, let's use a helper library like `react-redux` to simplify the way our stateful components communicate with the `redux` store.

Right now, our "container" components have the following **4 jobs**:

**Job 1.** Subscribe to the redux store when the component mounts.

**Job 2.** Get the state from the store, and send the parts we care about down as props to our stateless components.

**Job 3.** Define methods that dispatch changes to the store.

**Job 4.** Unsubscribe from the redux store when the component unmounts.

The `react-redux` library gives us a method called `connect` which **simplifies the way that we perform those 4 jobs**. To learn how to use it, let's do one of my favorite things - **write it ourselves!**

For example, pretend we have the following "container" component:

**fig. 1**
```js
import React from 'react';
import store from '../store';
import { incrementCounter } from '../action-creators';
import StatelessComponent from './StatelessComponent';

class ContainerComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
  }

  // Job 1: subscribe to the store
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  // Job 4: unsubscribe when unmounting
  componentWillUnmount () {
    this.unsubscribe();
  }

  // Job 3: define methods that dispatch to the store
  increment () {
    store.dispatch(incrementCounter());
  }

  render () {
    // Job 2: "map" data from the state into props
    const {counter} = this.state;
    return &lt;StatelessComponent counter={counter} increment={this.increment} />
  }
}
```

That's quite a lot of boilerplate. Especially the `componentDidMount` and `componentWillUnmount` hooks. Every container component we write will need that same code! Doesn't sound very DRY if you ask me.

We might solve this ourselves by writing a **function** that returns a **React component class** to handle that boilerplate. Here's what that might look like:

**fig. 2a**
```js
import React from 'react';
import store from '../store';

// this function takes a class that extends React.Component as an argument...
function createSubscribedComponent (OtherReactComponent) {
  // ...and returns a new class that extends React.Component - cool!
  return class extends React.Component {
    constructor (props) {
      super(props);
      this.state = store.getState();
    }

    // Job 1: subscribe to the store
    componentDidMount () {
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    // Job 4: unsubscribe when unmounting
    componentWillUnmount () {
      this.unsubscribe();
    }

    render () {
      return <OtherReactComponent passedDownState={this.state} />
    }
  }
}
```
** fig 2b**
```js
// Now, Job 1 and Job 4 can be entirely handled for us!
// This means now we only need to write a component to do Job 2 and Job 3!
import React from 'react';
import store from '../store';
import { incrementCounter } from '../action-creators';

class ContainerComponent extends React.Component {

  // Job 3: define methods that dispatch to the store
  increment () {
    store.dispatch(incrementCounter());
  }

  render () {
    // Job 2: "map" data from the state into props
    const {counter} = this.props.passedDownState;
    return <StatelessComponent counter={counter} increment={this.increment} />
  }
}

```
** fig 2c**
```js
// Now, we can create arbitrary components that subscribe and unsubscribe from the store.
// Just like this:

const SubscribedComponent = createSubscribedComponent(ContainerComponent);
```

Cool, so now we have a function that that will automate all of the `componentDidMount` and `componentWillUnmount` boilerplate, so we can just focus on writing components that map out state and map out functions that use dispatch. 

This is great...but we can do even better! Do we *really* need to write extra components to map out state and methods? We don't! Instead, we could just write **functions** that do Jobs 2 and 3 for us, and then teach the SubscribedComponent how to invoke them.

This is where it gets tricky, but don't worry - you may need to return to this point and re-read a couple of times before it clicks, and that's okay! Here we go:

We want to bake the ability to perform Jobs 2 and 3 into the component that `createSubscribedComponent` returns. We can do this by wrapping `createSubscribedComponent` in *another* function. This is the function that we're going to call `connect`.

`connect` is a function that returns a function (a.k.a a "higher-order function"). It returns our `createSubscribedComponent` function from before (with a few changes). `connect` takes two arguments, "functionThatDoesJob2", and "functionThatDoesJob3". We will write these functions ourselves every time we have a new component to create. We'll write them for our example in a moment but for now, assume the following:
* `functionThatDoesJob2` takes the redux store's state as an argument, and returns an *object* with just the props we want to pass as its key-value pairs.
* `functionThatDoesJob3` takes the redux store's `dispatch` method as an argument, and returns an *object* with all of the specific methods we want as key-value pairs.

**fig 3a**
```js
import React from 'react';
import store from '../store';

function connect (functionThatDoesJob2, functionThatDoesJob3) {
  // createSubscribedComponent will have closure over functionThatDoesJob2 and functionThatDoesJob3
  return function createSubscribedComponent (OtherReactComponent) {
    return class extends React.Component {
      constructor (props) {
        super(props);
        this.state = store.getState();
      }

      // Job 1: subscribe to the store
      componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
      }

      // Job 4: unsubscribe when unmounting
      componentWillUnmount () {
        this.unsubscribe();
      }

      render () {
        // Job 2: ourProps is an object that looks like this: 
        // { counter: state.counter }
        const ourProps = functionThatDoesJob2(store.getState());

        // Job 3: ourMethods is an object that looks like this: 
        // { increment: function () { dispatch(incrementCounter()) } }
        const ourMethods = functionThatDoesJob3(store.dispatch)

        // all of our props and methods get passed down to the OtherReactComponent!
        return <OtherReactComponent {...ourProps} {...ourMethods} />
      }
    }
  }
}
```

With the above in mind, here's how we might write `functionThatDoesJob2` and `functionThatDoesJob3`:

**fig 3b**
```js
import React from 'react';
import { incrementCounter } from '../action-creators';

// expects to receive the current state as an argument
// returns an object literal with just the fields from state we care about
function functionThatDoesJob2 (state) {
  return {
    counter: state.counter
  };
}

// expects to receive the dispatch method as an argument
// returns an object literal with the methods we want to use
function functionThatDoesJob3 (dispatch) {
  return {
    increment: function () {
      dispatch(incrementCounter());
    }
  };
}
```

Now, if we put this all together, we no longer need to write our own React.Component classes that subscribe/unsubscribe from the store **or** pass down props and methods. All we need to do is write those two functions above!

**fig 3c**
```js
// We pass in the two functions we wrote above to "connect" and invoke it,
// which gives us our "createSubscribedComponent" function, which now has closure over the
// two functions, and we invoke that with our target component!
const CompletedCounterComponent = connect(
  functionThatDoesJob2, functionThatDoesJob3)(StatelessComponent);
// We can pass our StatelessComponent right in to receive the props it needs! 
// No need to write a new class!
```

Now, **any time** we want a component that's hooked up to the redux store, we don't need to write a class - we just need to write a couple of functions! Compare that with all of the cruft from **fig 1**. How cool is that?

And this is _basically all that the `connect` method that we import from the `react-redux` library does!_ The official `connect` method is slightly more sophisticated than the one we've written here, but not by much! 

Lastly, in official `react-redux` parlance, the two functions we wrote (`functionThatDoesJob2` and `functionThatDoesJob3`) are commonly referred to as `mapStateToProps` and `mapDispatchToProps`. You'll probably want to call them that going forward :)

It's okay if the above doesn't totally click at first - while it might not be much code, it takes advantage of some fairly complex fundamental concepts like `closure` and `function composition`. It may not even totally click until you start to use `connect` yourself, which is also okay! We'll be doing quite a lot of that in the workshop very shortly!