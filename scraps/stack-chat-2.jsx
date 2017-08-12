
    export default
    <Workshop
      name="StackChat 2. React-Redux"
      description="Learn how the small but mighty React-Redux library can tie together our React components and our Redux store to make an app that's ready to scale into the big leagues!"
      artworkUrl="https://s3.amazonaws.com/learndotresources/workshop_artwork/1495736263613.jpeg">
    <Concept name="Intro">
    <Action name="Preparation">We're so close to perfection! At this point, `redux` has considerably simplified our ability to manage state by offering a single source of truth for the entire app and a friendly API for `dispatch`ing changes to that source of truth. 

However, there are still some annoyances lingering about - namely all of those container components we've written. For example, needing to use `store.subscribe` and `store.unsubscribe` all the time seems like cruft, right? We've also written `import store from ../store` so many times that my fingers are getting cramped. I suppose there are worse fates, but you know what they say - `a clean codebase is a maintainable codebase`.

They don't say that? _Well they should!_

Anyway, there's an extremely helpful little library called [`react-redux`](https://github.com/reactjs/react-redux) that's going to help us clean up our code considerably! And when I say little, I mean **little**. It's actually just **one function** - a function called `connect`! However, the `connect` function is going to help us write some amazing code. 

* I recommend reading [this section](http://redux.js.org/docs/basics/UsageWithReact.html) of the `redux` docs to learn how to use `connect` so that you can hit the ground running. 
* Additionally, the next section of this pre-reading contains a comprehensive example of how the `connect` function works (and how it will simplify our lives). I hope that you read it as well!
* Finally, we'll end up using a useful Redux function called `combineReducers`, which I recommend reading about [here](http://redux.js.org/docs/api/combineReducers.html)</Action>
    <Action name="Example: Make Your Own">As Dan Abramov (the creator of `redux`) has stressed multiple times, the `redux` library doesn't know anything about `react`. We could use it wherever we wanted - we might use it to simplify stateful web applications built with libraries like `angular` or even `jquery`. 

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
import {'{'} incrementCounter {'}'} from '../action-creators';
import StatelessComponent from './StatelessComponent';

class ContainerComponent extends React.Component {'{'}
  constructor (props) {'{'}
    super(props);
    this.state = store.getState();
  {'}'}

  // Job 1: subscribe to the store
  componentDidMount () {'{'}
    this.unsubscribe = store.subscribe(() =&gt; this.setState(store.getState()));
  {'}'}

  // Job 4: unsubscribe when unmounting
  componentWillUnmount () {'{'}
    this.unsubscribe();
  {'}'}

  // Job 3: define methods that dispatch to the store
  increment () {'{'}
    store.dispatch(incrementCounter());
  {'}'}

  render () {'{'}
    // Job 2: "map" data from the state into props
    const {'{'}counter{'}'} = this.state;
    return &lt;StatelessComponent counter={'{'}counter{'}'} increment={'{'}this.increment{'}'} /&gt;
  {'}'}
{'}'}
```

That's quite a lot of boilerplate. Especially the `componentDidMount` and `componentWillUnmount` hooks. Every container component we write will need that same code! Doesn't sound very DRY if you ask me.

We might solve this ourselves by writing a **function** that returns a **React component class** to handle that boilerplate. Here's what that might look like:

**fig. 2a**
```js
import React from 'react';
import store from '../store';

// this function takes a class that extends React.Component as an argument...
function createSubscribedComponent (OtherReactComponent) {'{'}
  // ...and returns a new class that extends React.Component - cool!
  return class extends React.Component {'{'}
    constructor (props) {'{'}
      super(props);
      this.state = store.getState();
    {'}'}

    // Job 1: subscribe to the store
    componentDidMount () {'{'}
      this.unsubscribe = store.subscribe(() =&gt; this.setState(store.getState()));
    {'}'}

    // Job 4: unsubscribe when unmounting
    componentWillUnmount () {'{'}
      this.unsubscribe();
    {'}'}

    render () {'{'}
      return &lt;OtherReactComponent passedDownState={'{'}this.state{'}'} /&gt;
    {'}'}
  {'}'}
{'}'}
```
** fig 2b**
```js
// Now, Job 1 and Job 4 can be entirely handled for us!
// This means now we only need to write a component to do Job 2 and Job 3!
import React from 'react';
import store from '../store';
import {'{'} incrementCounter {'}'} from '../action-creators';

class ContainerComponent extends React.Component {'{'}

  // Job 3: define methods that dispatch to the store
  increment () {'{'}
    store.dispatch(incrementCounter());
  {'}'}

  render () {'{'}
    // Job 2: "map" data from the state into props
    const {'{'}counter{'}'} = this.props.passedDownState;
    return &lt;StatelessComponent counter={'{'}counter{'}'} increment={'{'}this.increment{'}'} /&gt;
  {'}'}
{'}'}

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

function connect (functionThatDoesJob2, functionThatDoesJob3) {'{'}
  // createSubscribedComponent will have closure over functionThatDoesJob2 and functionThatDoesJob3
  return function createSubscribedComponent (OtherReactComponent) {'{'}
    return class extends React.Component {'{'}
      constructor (props) {'{'}
        super(props);
        this.state = store.getState();
      {'}'}

      // Job 1: subscribe to the store
      componentDidMount () {'{'}
        this.unsubscribe = store.subscribe(() =&gt; this.setState(store.getState()));
      {'}'}

      // Job 4: unsubscribe when unmounting
      componentWillUnmount () {'{'}
        this.unsubscribe();
      {'}'}

      render () {'{'}
        // Job 2: ourProps is an object that looks like this: 
        // {'{'} counter: state.counter {'}'}
        const ourProps = functionThatDoesJob2(store.getState());

        // Job 3: ourMethods is an object that looks like this: 
        // {'{'} increment: function () {'{'} dispatch(incrementCounter()) {'}'} {'}'}
        const ourMethods = functionThatDoesJob3(store.dispatch)

        // all of our props and methods get passed down to the OtherReactComponent!
        return &lt;OtherReactComponent {'{'}...ourProps{'}'} {'{'}...ourMethods{'}'} /&gt;
      {'}'}
    {'}'}
  {'}'}
{'}'}
```

With the above in mind, here's how we might write `functionThatDoesJob2` and `functionThatDoesJob3`:

**fig 3b**
```js
import React from 'react';
import {'{'} incrementCounter {'}'} from '../action-creators';

// expects to receive the current state as an argument
// returns an object literal with just the fields from state we care about
function functionThatDoesJob2 (state) {'{'}
  return {'{'}
    counter: state.counter
  {'}'};
{'}'}

// expects to receive the dispatch method as an argument
// returns an object literal with the methods we want to use
function functionThatDoesJob3 (dispatch) {'{'}
  return {'{'}
    increment: function () {'{'}
      dispatch(incrementCounter());
    {'}'}
  {'}'};
{'}'}
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

It's okay if the above doesn't totally click at first - while it might not be much code, it takes advantage of some fairly complex fundamental concepts like `closure` and `function composition`. It may not even totally click until you start to use `connect` yourself, which is also okay! We'll be doing quite a lot of that in the workshop very shortly!</Action>
    <Action name="Goal">For this workshop, we will be introducing the `react-redux` library to replace the boilerplate for subscribing our components to the store with `connect` components.

We'll do lots of refactoring of old code to practice, but first - we'll write our first `connect` component by implementing some new features.

We've added a new Route that renders a component for adding new channels:

&lt;h5&gt;Starting Point&lt;/h5&gt;
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux-start.png" /&gt;

We have three main tasks:

1. Channels should no longer be hardcoded we'll fetch them from the server
2. Allow a user to create a new channel
3. **Bonus**: The selected channel name should display in the top nav

&lt;h5&gt;Goals 1 and 2&lt;/h5&gt;
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux1-1.png" /&gt;

&lt;h5&gt;Goal 3 (Bonus)&lt;/h5&gt;
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux2.png" /&gt;</Action>
    <Action name="Starting Point">## Install StackChat 2 Start

If you have not yet forked https://github.com/FullstackAcademy/stackchat, then please do so now.

Clone it again into a new repo like so: `git clone https://github.com/&lt;your-github-username&gt;/stackchat --branch day2-starting`, and then `npm install` (or `yarn install`) again. This will set up a new repo with the day 2 starting code.

We recommend that you branch off from this starting point branch (for example, you could create and checkout a new branch called "day2" by typing: `git checkout -b day2`) and work off from that branch instead of "master".</Action></Concept>
    <Concept name="Provider">
    <Action name="Install">To get started with `react-redux`, we of course need to install it:

`npm install --save react-redux`

&lt;guide&gt;
You have installed react-redux
&lt;/guide&gt;</Action>
    <Action name="Plugging In">Remember how I said `connect` is the only thing that the `react-redux` library gives us? I sort of lied. There is _one more thing_ that `react-redux` gives us, but it's just a bit of boilerplate code to make our lives easier.

This boilerplate code is a component called `Provider`. It goes at the _very top_ of our component hierarchy and accepts our `store` as a prop. All it does is it puts the `store` onto a _slightly magical_ React thing called [context](https://facebook.github.io/react/docs/context.html). Here's what it looks like:

```js
import {'{'} Provider {'}'} from 'react-redux';
import store from './store';

ReactDOM.render(
  &lt;Provider store={'{'}store{'}'}&gt;
    &lt;Router&gt;
      &lt;Main /&gt;
    &lt;/Router&gt;
  &lt;/Provider&gt;,
  document.getElementById('app')
);
```

`Context` is essentially like a [global variable](https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/global_variables.png) for our React app, which will make the store available in all of our child components as `this.context.store`. 

*I know, I know*, **I know** - here's the thing though: the `connect` method needs the store to work, so if it doesn't find it on context, then it's going to need it passed as a prop every time we use `connect`. And that's fine, but it's also a pain. We've done a lot of typing, so we deserve a little magic.

**NOTE:** The `connect` method is allowed to grab the store from context, but I strongly urge you not to do this yourself. If you find yourself accessing the store from context yourself, you are probably doing something wrong - we'll see that `react-redux` gives us an interface to the store via `mapStateToProps`.

**NOTE 2:** Seriously, don't try to use context in any other way than this. This is the only time you're allowed to use context. Ever.

&lt;guide&gt;
You have read and understood the above
You have acknowledged the evils of global variables, but are okay with just this once and never again
&lt;/guide&gt;</Action>
    <Action name="Provide It">Go ahead and plug the store into the Provider in your `client/index.js` - *just this once, and we won't worry about it again*.

&lt;guide&gt;
You have imported and set up the Provider component properly at the root of your app
You have sworn to never use global variables again but for this one time
&lt;/guide&gt;</Action></Concept>
    <Concept name="Connect">
    <Action name="Codebase">With that little bit of unpleasantness behind us, let's get to the goods!

First, let's re-familiarize ourselves with the codebase - it may be a bit different than what you ended up with yesterday. In particular, check out:

1. `Main.js` - a new Route has been added here to render the new channel entry view. Also note that we are now using the `componentDidMount` hook in `Main.js` to fetch all of our messages, rather than the one in `MessagesList.js`. This is because we always want to update the message counter next to each channel name in the sidebar whenever the app loads. If we only fetched all messages when `MessagesList` loaded, we would not have them if we refreshed the page while looking at the "new-channel" Route.
2. `NewChannelEntry.js` - this is our form for entering new channels
3. `ChannelList.js` - this is our hardcoded list of channels that we're going to replace
4. `store.js` - make sure that you remember how the store is organized
5. `server/socket.js` - a new listener has been added for channels! We'll want this later!

&lt;guide&gt;
You have reviewed at least the components above
&lt;/guide&gt;</Action>
    <Action name="Channels">Let's get started by replacing the hardcoded channels in our `ChannelList` with real channels from the server. If you request http://localhost:8080/api/channels, you should receive a JSON list of channels from the server (they match the ones that we've hardcoded in). 

If we want them to show up in our view, we need to store them on our state (just like messages). Let's start out by making room for channels in our Redux store! This will be a great review of all of the concepts we learned yesterday. In `store.js`:

* Add an `action type` to represent getting channels from the server
* Add a field to our `initialState` to represent our list of channels
* Add an `action creator` that creates an action for receiving our channels from the server
* Add a case to our `reducer` that updates our state with the list of channels we get when we dispatch our action
* Finally, add a `thunk creator` that creates a thunk to perform the AJAX request that fetches our channels from the server. The thunk should eventually dispatch our synchronous channel action to the store

For reference, look at the way we currently fetch our list of messages from the server and add them to our store - channels will be very similar.

&lt;hint title="Solution"&gt;
You'll eventually end up adding code like this:

&lt;pre&gt;
// action type
const GET_CHANNELS = 'GET_CHANNELS';

// action creator
function getChannels (channels) {'{'}
  return {'{'}
    type: GET_CHANNELS,
    channels: channels
  {'}'};
{'}'}

// thunk creator
function fetchChannels () {'{'}
  return function (dispatch) {'{'}
    axios.get('/api/channels')
      .then(res =&gt; res.data)
      .then(channels =&gt; dispatch(getChannels(channels)));
  {'}'}
{'}'}

// initialState
const initialState = {'{'}
  messages: [],
  name: '',
  newMessageEntry: '',
  channels: []
{'}'}

// reducer
function reducer (state = initialState, action) {'{'}
  // etc...

  case GET_CHANNELS:
    return {'{'} ...state, channels: action.channels {'}'};

  // etc...
{'}'}
&lt;/pre&gt;
&lt;/hint&gt;

&lt;guide&gt;
You have completed the steps above
&lt;/guide&gt;</Action>
    <Action name="Loading Channels">First, let's get our list of channels from the server (right now, we're still using hardcoded data).

&lt;ol&gt;

&lt;li&gt; Open `Main.js` &lt;/li&gt;
&lt;li&gt; Import your "fetch channels" thunk creator &lt;/li&gt;
&lt;li&gt; In the `componentDidMount` of the `Main` component, dispatch a thunk for fetching the channels (this is in addition to dispatching the thunk to get messages that's already there). It's totally fine to dispatch the thunks separately - it doesn't matter who gets there first &lt;/li&gt;

&lt;hint title="Solution"&gt;
Your `componentDidMount` should look something like this:
```js
  componentDidMount () {'{'}
    const messagesThunk = fetchMessages();
    const channelsThunk = fetchChannels();
    store.dispatch(messagesThunk);
    store.dispatch(channelsThunk);
  {'}'}
```
&lt;/hint&gt;

&lt;br/&gt;
At this point, whenever your app loads, you'll fetch all of the messages *and* channels and put them in the store. Now that the channels are in the store, we can use them!

&lt;/ol&gt;

&lt;guide&gt;
You have completed the steps above
&lt;/guide&gt;</Action>
    <Action name="A Connection">The moment of truth is at hand! Get ready to write your first `connect` component using `react-redux`. If you haven't had the chance yet, read [this page of the redux docs](http://redux.js.org/docs/basics/UsageWithReact.html) to familiarize yourself with how `connect` works. I'll walk you through this first one step by step.

&lt;ol&gt;

&lt;li&gt; Open `ChannelList.js`&lt;/li&gt;
&lt;br/&gt;
&lt;li&gt; Remove all of the `store.subscribe` boilerplate - we're going to replace it with `connect`. You can even re-write the component as a function! Get rid of all that hardcoded data as well - we're going to replace it with REAL data from the store! &lt;/li&gt;
&lt;br/&gt;
&lt;hint title="Possible starting point"&gt;

We could re-write the ChannelList component to look like this:

&lt;pre&gt;
function ChannelList (props) {'{'}
  return (
    &lt;ul&gt;
      &lt;li&gt;
        &lt;NavLink to={'{'}"URL_GOES_HERE"{'}'} activeClassName="active"&gt;
          &lt;span&gt;# {'{'}/* channel name goes here */{'}'}&lt;/span&gt;
          &lt;span className="badge"&gt;{'{'}/* number of messages calculation goes here */{'}'}&lt;/span&gt;
        &lt;/NavLink&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;NavLink to="/new-channel"&gt;Create a channel...&lt;/NavLink&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  );
{'}'}
&lt;/pre&gt;
&lt;/hint&gt;
&lt;br/&gt;
&lt;li&gt; Import `connect` from `react-redux` (remember, it's **not** a default export).&lt;/li&gt;
&lt;br/&gt;
&lt;li&gt; Write a function called `mapStateToProps`. It should expect to receive `state` as its first argument, and return an empty object (we'll fill it in later).&lt;/li&gt;
&lt;br/&gt;
&lt;hint title="Solution"&gt;
```js
const mapStateToProps = function (state) {'{'}
  return {'{'}{'}'};
{'}'};
```
&lt;/hint&gt;
&lt;br/&gt;
&lt;li&gt; Pass `mapStateToProps` to `connect`. This will return another function - pass the `ChannelList` component to that function. Store the result in a variable called `ChannelListContainer` &lt;/li&gt;
&lt;br/&gt;
&lt;hint title="Solution"&gt;
Double functions, whoa!
```js
const ChannelListContainer = connect(mapStateToProps)(ChannelList);
```
&lt;/hint&gt;
&lt;br/&gt;
What just happened? To get a full understanding, check out the [Example](https://learn.fullstackacademy.com/workshop/591c4d7633a48d0004c39898/content/591c4d7733a48d0004c398a4/text) - but in short, we've wrapped our "dumb" ChannelList component in a "smart" component that's connected to the store! All we need to do now is decide what values we want to get from the store (using the `mapStateToProps` function that we wrote), and we'll be guaranteed to re-render the component with them every time they change!
&lt;br/&gt;&lt;br/&gt;
&lt;li&gt; Export the `ChannelListContainer` by default (you may need to remove the `export default` from the original `ChannelList` &lt;/li&gt;
&lt;br/&gt;
&lt;/ol&gt;

Now, when we render `&lt;ChannelList /&gt;` from another component, we're *actually* rendering the smart container, which in turn renders the "dumb" component! Before things work the way they did before though, we need to complete a few more steps - move on to the next section and we'll wrap things up!

&lt;guide&gt;
You have completed the steps above
&lt;/guide&gt;</Action>
    <Action name="Map State">Now that `ChannelList` is connected, let's see what it means to "map state to props".

1. Map the channels field on state to a prop that we give to `ChannelList`
&lt;br/&gt;&lt;br/&gt;
&lt;hint title="Solution"&gt;
```js
const mapStateToProps = function (state) {'{'}
  return {'{'}
    channels: state.channels
  {'}'};
{'}'};
```
&lt;/hint&gt;
&lt;br/&gt;
2. Map the messages field on state to a prop that we give to `ChannelList`
&lt;br/&gt;&lt;br/&gt;
&lt;hint title="Solution"&gt;
```js
const mapStateToProps = function (state) {'{'}
  return {'{'}
    channels: state.channels,
    messages: state.messages
  {'}'};
{'}'};
```
&lt;/hint&gt;
&lt;br/&gt;
Now, our `ChannelList` component will be re-rendered with the channels and messages values from our state whenever either of them change. This means we can use them to calculate the view!
&lt;br/&gt;&lt;br/&gt;
3. In the `ChannelList` dumb component, use the channels array (available on props) to map out a list of `&lt;li&gt;` elements to match what we had before.
&lt;br/&gt;&lt;br/&gt;
&lt;hint title="Solution"&gt;
In the ChannelList component:

&lt;pre&gt;
function ChannelList (props) {'{'}
  return (
    &lt;ul&gt;
      {'{'}
        props.channels.map(channel =&gt; {'{'}
          return (
            &lt;li key={'{'}channel.id{'}'}&gt;
              &lt;NavLink to={'{'}`/channels/${'{'}channel.id{'}'}`{'}'} activeClassName="active"&gt;
                &lt;span&gt;# {'{'}channel.name{'}'}&lt;/span&gt;
                &lt;span className="badge"&gt;{'{'}/* number of messages calculation goes here */{'}'}&lt;/span&gt;
              &lt;/NavLink&gt;
             &lt;/li&gt;
          )
        {'}'})
      {'}'}
      &lt;li&gt;
        &lt;NavLink to="/new-channel"&gt;Create a channel...&lt;/NavLink&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  );
{'}'}
&lt;/pre&gt;

&lt;/hint&gt;
&lt;br/&gt;
4. In the `ChannelList` dumb component, use the messages array (available on props) to re-implement the message counter next to each channel.
&lt;br/&gt;&lt;br/&gt;
&lt;hint title="Solution"&gt;
In the ChannelList component:

&lt;pre&gt;
function ChannelList (props) {'{'}
  return (
    &lt;ul&gt;
      {'{'}
        props.channels.map(channel =&gt; {'{'}
          return (
            &lt;li key={'{'}channel.id{'}'}&gt;
              &lt;NavLink to={'{'}`/channels/${'{'}channel.id{'}'}`{'}'} activeClassName="active"&gt;
                &lt;span&gt;# {'{'}channel.name{'}'}&lt;/span&gt;
                &lt;span className="badge"&gt;{'{'}props.messages.filter(message =&gt; message.channelId === channel.id).length{'}'}&lt;/span&gt;
              &lt;/NavLink&gt;
             &lt;/li&gt;
          )
        {'}'})
      {'}'}
      &lt;li&gt;
        &lt;NavLink to="/new-channel"&gt;Create a channel...&lt;/NavLink&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  );
{'}'}
&lt;/pre&gt;

&lt;/hint&gt;

**Try it out!** The channels should appear again, and adding new messages should update the counter for that channel!

&lt;p style="color:red;font-weight:bold"&gt;Wait up! Something's broken!&lt;/p&gt; You might notice that channels in the sidebar no longer switch to their `activeClassName` when you select them - that stinks! We'll learn why this is happening and fix it shortly - move on in the meantime.

&lt;guide&gt;
Everything should work they way it did when we started (except for the bug mentioned above). Only now, we're using real data!
&lt;/guide&gt;</Action></Concept>
    <Concept name="Adding New Channels">
    <Action name="Goal">So far, we've written a new container that uses a `mapStateToProps` function to get our list of channels and messages from state, and passes them down to our presentational component.

Next, we'll dive into the marshmallow center of the workshop - adding new channels - and see how we can pass down behavior as well using `connect`'s second argument, `mapDispatchToProps`.

&lt;guide&gt;
You have read and understood the above
&lt;/guide&gt;</Action>
    <Action name="Channel Entry">Our goal is to fill out a form with a channel's name and submit it to post a new channel. We should model this behavior out in Redux (in `store.js`) before we worry about our view components. 

By now, this should start to feel familiar - feel free to give it a shot on your own! The process will be very similar to posting new messages, so you can use that code as a reference. If you want some more guidance, open the hint below - it will advise you on the different ingredients you need to make.

&lt;hint title="Guidebook"&gt;
* Add a field to state for the value of the channel entry input field
* Write an action type and an action creator for writing a channel name into the input
* Write an action type and an action creator for receiving a new channel from the server
* Add cases to your reducer for handling the two actions above
* Write a thunk that will post a new channel to the server, and then dispatch the action for adding a new channel to our array of channels. To post a new channel on the server, we need a request body that includes the `name` of the new channel
&lt;/hint&gt;
&lt;br/&gt;
&lt;hint title="Solution"&gt;
You will likely end up with new code like this in your `store.js`:

```js
// action types
const WRITE_CHANNEL_NAME = 'WRITE_CHANNEL_NAME';
const GET_CHANNEL = 'GET_CHANNEL';

// action creators
export function writeChannelName (channelName) {'{'}
  const action = {'{'} type: WRITE_CHANNEL_NAME, channelName {'}'};
  return action;
{'}'}

export function getChannel (channel) {'{'}
  const action = {'{'} type: GET_CHANNEL, channel {'}'};
  return action;
{'}'}

// thunk creator
export function postChannel (channel) {'{'} // expecting channel to an object like: {'{'} name: 'new_channel_name' {'}'}

  return function thunk (dispatch) {'{'}
    return axios.post('/api/channels', channel)
      .then(function (res) {'{'} return res.data {'}'})
      .then(function (newChannel) {'{'}
        dispatch(getChannel(newChannel));
      {'}'});
  {'}'};
{'}'}

function reducer (state = initialState, action) {'{'}
  // etc...
    case WRITE_CHANNEL_NAME:
      return {'{'}
        ...state,
        newChannelEntry: action.channelName
      {'}'};

    case GET_CHANNEL:
      return {'{'}
        ...state,
        channels: [...state.channels, action.channel]
      {'}'};

  // etc...
{'}'}

```
&lt;/hint&gt;

&lt;guide&gt;
You have added the necessary functionality to `store.js`
&lt;/guide&gt;</Action>
    <Action name="Defining Methods With mapDispatchToProps">Now that we can handle adding a new channel with Redux, let's get down to connecting our component!

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
const mapDispatchToProps = function (dispatch) {'{'}
  return {'{'}
    someMethod: function () {'{'}
      dispatch(someActionCreator())
    {'}'};
  {'}'};
{'}'}

// receives state as an argument
const mapStateToProps = function (state) {'{'}
  return {'{'}
    someStuff: state.someStuff
  {'}'}
{'}'}

// receives the props that mapStateToProps and mapDispatchToProps define
function SomeComponent (props) {'{'}
  return (
    &lt;div&gt;
      &lt;h5&gt;{'{'} props.someStuff {'}'}&lt;/h5&gt; {'{'}/* props.someStuff comes from mapStateToProps */{'}'}
      &lt;button onClick={'{'}props.someMethod{'}'}&gt;Click Me&lt;/button&gt; {'{'}/* props.someMethod comes from mapDispatchToProps */{'}'}
    &lt;/div&gt;
  )
{'}'}

const SomeContainer = connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

&lt;guide&gt;
You have read and understood the above
&lt;/guide&gt;</Action>
    <Action name="Control Input">Let's start connecting `NewChannelEntry`!

&lt;ol&gt;
&lt;li&gt; Import `connect` into `NewChannelEntry.js`&lt;/li&gt;
&lt;br/&gt;
&lt;li&gt; Write `mapStateToProps` and `mapDispatchToProps` functions (return empty objects for now). Pass these to `connect`, and then pass in the NewChannelEntry component to create the container. Export the container by default.&lt;/li&gt;
&lt;br/&gt;
&lt;hint title="Solution"&gt;
```js
const mapStateToProps = function (state) {'{'}
  return {'{'}{'}'};
{'}'};
const mapDispatchToProps = function (dispatch) {'{'}
  return {'{'}{'}'};
{'}'};

const Container = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);
export default Container;
```
&lt;/hint&gt;

&lt;br/&gt;
Now that we're set up, let's map some state to props.

&lt;li&gt; Map the value of the channel input from our state to be a prop for the `NewChannelEntry` component &lt;/li&gt;
&lt;br/&gt;
&lt;hint title="Solution"&gt;
```js
const mapStateToProps = function (state) {'{'}
  return {'{'}
    newChannelEntry: state.newChannelEntry
  {'}'};
{'}'};
```
&lt;/hint&gt;
&lt;br/&gt;
&lt;li&gt; Pass the input value from state in as the `value` prop for the `&lt;input&gt;` element in the component. Remember that this makes our `&lt;input&gt;` a "controlled" component. &lt;/li&gt;
&lt;br/&gt;
&lt;/ol&gt;
&lt;hint title="Solution"&gt;
&lt;pre&gt;
&lt;input
  value={'{'}props.newChannelEntry{'}'}
  className="form-control"
  type="text"
  name="name"
  placeholder="Enter channel name"
/&gt;
&lt;/pre&gt;
&lt;/hint&gt;

&lt;guide&gt;
You have completed the steps above
&lt;/guide&gt;</Action>
    <Action name="Handling Change">Now let's work up the behavior that we'll pass to the component.

&lt;ol&gt;
&lt;li&gt; In the object your `mapDispatchToProps` function returns, write a "handleChange" function. This should accept an "event", and dispatch an action to update the input value in the store &lt;/li&gt;
&lt;/br&gt;
&lt;hint title="Solution"&gt;
```js
import {'{'} writeChannelName {'}'} from '../store';

const mapDispatchToProps = function (dispatch, ownProps) {'{'}
  return {'{'}
    handleChange (evt) {'{'}
      dispatch(writeChannelName(evt.target.value));
    {'}'}
  {'}'};
{'}'};
```
&lt;/hint&gt;
&lt;br/&gt;
&lt;li&gt;Pass your change handler to the change listener on the `&lt;input&gt;`&lt;/li&gt;
&lt;br/&gt;

&lt;hint title="Solution"&gt;
&lt;pre&gt;
&lt;input
  value={'{'}props.newChannelEntry{'}'}
  onChange={'{'}props.handleChange{'}'}
  className="form-control"
  type="text"
  name="name"
  placeholder="Enter channel name"
/&gt;
&lt;/pre&gt;
&lt;/hint&gt;

&lt;br/&gt;
When you're done, typing into the input field should update the value in the store!

&lt;guide&gt;
You have completed the steps above
&lt;/guide&gt;</Action>
    <Action name="Submitting a Channel">All right - we're very close now. 

&lt;ol&gt;

&lt;li&gt; In your `mapDispatchToProps`, write a submit handler function that you can pass down to the component. It should expect the event object as an argument, and should dispatch our `postChannel` thunk. We have two options for getting the value of the form input - we could use the value that we've stored on state, or we could "cheat" a little bit and grab the value off of the event, which may be quicker for now. Remember that for submit events, you can find the value of any form input by its name on `event.target` (for example, in this case we could find the current value of the input on `event.target.channelName.value`, because our `&lt;input&gt;` in the form has `name="channelName"`. &lt;/li&gt;

&lt;br/&gt;

&lt;hint title="Solution"&gt;
Here's how we would grab the value off of the event:

```js
import {'{'} writeChannelName, postChannel {'}'} from '../store';

const mapDispatchToProps = function (dispatch, ownProps) {'{'}
  return {'{'}
    handleChange (evt) {'{'}
      dispatch(writeChannelName(evt.target.value));
    {'}'},
    handleSubmit (evt) {'{'}
      evt.preventDefault();
      const name = evt.target.channelName.value;
      dispatch(postChannel({'{'} name {'}'}));  // this is ES6 object destructuring! It's equivalent to {'{'} name: name {'}'}
    {'}'}
  {'}'};
{'}'};
```
&lt;/hint&gt;

&lt;br/&gt;

&lt;li&gt; Attach the submit handler to the `&lt;form&gt;` element. &lt;/li&gt;

&lt;br/&gt;

&lt;hint title="Solution"&gt;
&lt;pre&gt;
&lt;form onSubmit={'{'}props.handleSubmit{'}'}&gt;
&lt;/pre&gt;
&lt;/hint&gt;

&lt;br/&gt;

**Try it out** - you should see the new channel get added. That being said, it'd be no fun to just chat on this new channel ourselves. Let's make sure to emit this new channel across sockets so that other clients get the new channel as well!

&lt;br/&gt;
&lt;br/&gt;

&lt;li&gt; After we've created the new channel, we want to emit a `'new-channel'` event. This will be very similar to what we've done for new messages. &lt;/li&gt;

&lt;br/&gt;

&lt;hint title="Solution"&gt;
&lt;pre&gt;
export function postChannel (channel) {'{'}

  return function thunk (dispatch) {'{'}
    return axios.post('/api/channels', channel)
      .then(res =&gt; res.data)
      .then(newChannel =&gt; {'{'}
        dispatch(getChannel(newChannel));
        socket.emit('new-channel', newChannel);
      {'}'});
  {'}'};
{'}'}
&lt;/pre&gt;
&lt;/hint&gt;

&lt;br/&gt;

&lt;li&gt; If you check out `server/socket/index.js`, you'll notice that we're already listening for the `'new-channel'` event, and emitting one back to all other clients. This means that all we need to do now is listen for that event from the client, and update our state with the new channel. Once again, this should be quite familiar. &lt;/li&gt;

&lt;br/&gt;

&lt;hint title="Solution"&gt;
In `client/socket.js`:
&lt;pre&gt;
  socket.on('new-channel', channel =&gt; {'{'}
    store.dispatch(getChannel(channel));
  {'}'});
&lt;/pre&gt;
&lt;/hint&gt;

&lt;/ol&gt;

**Try it out again!** Use your partner's machine or another browser tab to test. Now we're rolling in real time!

There are two more improvements we can make, though:

* It would be nice if the field cleared out its value when we submitted...this is an optional exercise for you
* When we create a new channel, it would be really nice to instantly navigate to that new channel. We will do this together in the next section

&lt;guide&gt;
You can create new channels, and these new channels appear across sockets
&lt;/guide&gt;</Action>
    <Action name="OwnProps">Before we go any further, let's take a moment to learn about the **second** argument that `connect` passes to both `mapStateToProps` and `mapDispatchToProps`. It's called `ownProps`.

In addition to `state` as its first parameter, `mapStateToProps` functions can also expect to receive an object called `ownProps` in the second parameter.

```js
function mapStateToProps = function (state, ownProps) {'{'}
  return {'{'}
    // etc...
  {'}'};
{'}'}
```

Likewise, `mapDispatchToProps` receives the **same** thing.
```js
function mapDispatchToProps = function (dispatch, ownProps) {'{'}
  return {'{'}
    // etc...
  {'}'};
{'}'}
```

This is so that container components can accept props of their own (for example, from other components we write, or from `react-router` if a container is mounted under a `Route`).

Consider this example:

```js
import FoodListContainer from '../containers/FoodListContainer';

export default function MyFavoriteFoods (props) {'{'}

  // ["bagels", "chocolate", "key lime pie"]
  // ...in case anyone was wondering
  const myFavoriteFoods = props.myFavoriteFoods;

  return (
    &lt;div&gt;
      &lt;h3&gt;Blah Blah Blah&lt;/h3&gt;
      &lt;FoodListContainer favorites={'{'}myFavoriteFoods{'}'} /&gt;
    &lt;/div&gt;
  );
{'}'}
```

Now, if `FoodListContainer` is a `connect` component, we will have access to "myFavoriteFoods" as `ownProps.favorites`:

```js
const mapStateToProps = function (state, ownProps) {'{'}
  return {'{'}
    favorites: ownProps.favorites, // ["bagels", "chocolate", "key lime pie"]
    hasHealthyDiet: ownProps.favorites.indexOf("broccoli") !== -1 // false :(
  {'}'};
{'}'}

const mapDispatchToProps = function (dispatch, ownProps) {'{'}
  return {'{'}
    changeDiet: function () {'{'}
      dispatch(changeDietActionCreator(ownProps.favorites))
    {'}'}
  {'}'};
{'}'}
```

Sound good? Then onward!

&lt;guide&gt;
You have read and understood the above
&lt;/guide&gt;</Action>
    <Action name="Dynamic Routing">Now, where were we? Oh yes - when we create a new channel, we want to dynamically navigate to that new channel. To do this, we'll learn a little bit more about React Router's [`history`](https://reacttraining.com/react-router/web/api/history) prop.

In addition to `match` and `location`, `history` is one of the three props that every `Route` passes to its `component`. The `history` object is mutable (so use it with care)! We need it here though, because it supports a method (`history.push('pathname')`), which will allow us to dynamically change the value in the URL bar such that everything in our router will re-render.

**Example**:

* If we say `history.push('/new-channel')`, then the url will change to `http://localhost:8080/new-channel`, and the new channel component will be re-rendered.

* If we say `history.push('/channels/1')`, then the url will change to `http://localhost:8080/channels/1`, and the messages list component will be re-rendered.

With this in mind:

* In your `NewChannelEntry`, obtain the `history` prop that the `Route` sends to you
* Use the `history.push` method to update the url *after* the new channel is created

**Note:** when you're done, it may be difficult to tell that it worked because of our `activeClassName` bug! To test it out, send a message to your new channel and make sure that the proper message counter increments!

&lt;hint title="Where is the history object?"&gt;
Remember `ownProps` is the second argument to `mapDispatchToProps` and `mapStateToProps`. You'll find it there! 
&lt;/hint&gt;

&lt;hint title="More hints"&gt;
Thunk creators can take any number of arguments - why not pass `history` along so that you can use it after the channel is created?
&lt;/hint&gt;

&lt;hint title="Solution"&gt;
You submit handler may change like so. We'll pass down the history object as an additional argument to postChannel:

```js
    handleSubmit (name, evt) {'{'}
      evt.preventDefault();
      dispatch(postChannel({'{'} name {'}'}, ownProps.history));
      dispatch(writeChannelName(''));
    {'}'}
```

And your postChannel thunk creator may be modified to do this, so that it uses history.push after the promise resolves:

&lt;pre&gt;
export function postChannel (channel, history) {'{'}

  return function thunk (dispatch) {'{'}
    return axios.post('/api/channels', channel)
      .then(res =&gt; res.data)
      .then(newChannel =&gt; {'{'}
        dispatch(getChannel(newChannel));
        socket.emit('new-channel', newChannel);
        history.push(`/channels/${'{'}newChannel.id{'}'}`);
      {'}'});
  {'}'};
{'}'}
&lt;/pre&gt;
&lt;/hint&gt;

&lt;guide&gt;
Submitting a new channel switched you to that new channel
&lt;/guide&gt;</Action></Concept>
    <Concept name="Optimizations">
    <Action name="Goal">So far so good! We can create new channels, which update across clients! We still have two outstanding issues to resolve:

* Fixing our `activeClassName` bug
* Showing the channel name in the header

For this next section, we'll focus on fixing the `activeClassName` bug, and clean up the code in `store.js` by using an extremely helpful `redux` utility called `combineReducers`.

&lt;guide&gt;
You have read the above
&lt;/guide&gt;</Action>
    <Action name="A Word on shouldComponentUpdate">If you've been reading the React and/or Redux docs, you may have come across a lifecycle hook called [`shouldComponentUpdate`](https://facebook.github.io/react/docs/optimizing-performance.html#avoid-reconciliation), which can yield some massive performance wins for React.

The doc linked to above goes into some great detail about how it works, so I won't cover it too much myself, but the gist is that React components have a lifecycle hook called `shouldComponentUpdate`, which receives the `nextProps` and `nextState` that are passed down to a component when it's about to re-render. If `shouldComponentUpdate` is defined, it will be evaluated before that component re-renders, and if `shouldComponentUpdate` returns `false`, the rendering will be canceled!

This could yield huge benefits. Consider the following (common) situation:
```js
    &lt;SharedStateContainer&gt; // state has three fields: {'{'} foo, bar, quux {'}'}
    /                    \
&lt;ComponentA&gt;          &lt;ComponentB&gt;
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

&lt;guide&gt;
You have read and understood the above
&lt;/guide&gt;</Action>
    <Action name="Update Blocking and withRouter">That being said, `connect` and `shouldComponentUpdate` are the source of our `activeClassName` woes. Here's why:

In `ChannelList.js`, think about the props that we receive: messages and channels. Do either of these change when the url changes from `/channels/1` to `/channels/2`? No, they don't! Because the component doesn't receive any data that changes, the `connect` will be *too* smart and block re-rendering.

Now, what data *does* change when the url changes? The answer is the route props that we get from React Router (`match`, `location` and `history`)! However, those props are only passed from `Route`s down to their `component`s, and `ChannelList` is not rendered by a `Route`.

Fortunately, React Router exposes a nice higher order function that we can use to pass down the the route props to any arbitrary component: [`withRouter`](https://reacttraining.com/react-router/web/api/withRouter). We can use this to pass the route props to `ChannelList` - `connect` will recognize the changing data, and re-render like normal.

* Check out this article in the React Router docs about update blocking (and how to fix it): https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
* Use `withRouter` fix our `activeClassName` bug

&lt;hint title="Solution"&gt;
If we wrap our connected component in `withRouter`, the connected component will be aware when the router changes

```js
export default withRouter(connect(mapStateToProps)(ChannelList));
```
&lt;/hint&gt;

&lt;guide&gt;
The activeClassName changes appropriately in the channel list again
&lt;/guide&gt;</Action>
    <Action name="Combine Reducers">Something that might be bugging you is how big the `switch` statement within our `reducer` has gotten. It's bugging me too - fortunately, `redux` offers us a utility function that we can use to break up our one big reducer into many smaller "sub-reducers".

If you haven't yet (or even if you have), check out the [Redux docs for combineReducers](http://redux.js.org/docs/api/combineReducers.html)

When you feel comfortable with what `combineReducers` does, move on and we'll use it to refactor our Redux code!

&lt;guide&gt;
You have learned about combineReducers
&lt;/guide&gt;</Action>
    <Action name="Breaking Up store.js">Now that we know how `combineReducers` works, let's refactor `store.js` so that instead of a single `store.js`, we have a `store/` directory that contains multiple sub-reducers, and combines them all in an `index.js`. You should have a sub-reducer for each slice of state.

Here's what it might look like:

&lt;hint title="store directory"&gt;
```
client/
  store/
    channels.js
    index.js
    messages.js
    name.js
    newChannelEntry.js
    newMessageEntry.js
```
&lt;/hint&gt;

If you would like an example to get started, here's what `messages.js` and `index.js` might look like:

&lt;hint title="messages.js"&gt;

Note how in the sub-reducer, the `state` is actually the messages array itself! `combineReducers` does all the work of putting together our big "state" object together.

&lt;pre&gt;
import axios from 'axios';
import socket from '../socket';

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS

export function getMessage (message) {'{'}
  const action = {'{'} type: GET_MESSAGE, message {'}'};
  return action;
{'}'}

export function getMessages (messages) {'{'}
  const action = {'{'} type: GET_MESSAGES, messages {'}'};
  return action;
{'}'}

// THUNK CREATORS

export function fetchMessages () {'{'}

  return function thunk (dispatch) {'{'}
    return axios.get('/api/messages')
      .then(res =&gt; res.data)
      .then(messages =&gt; {'{'}
        const action = getMessages(messages);
        dispatch(action);
      {'}'});
  {'}'};
{'}'}

export function postMessage (message) {'{'}

  return function thunk (dispatch) {'{'}
    return axios.post('/api/messages', message)
      .then(res =&gt; res.data)
      .then(newMessage =&gt; {'{'}
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      {'}'});
  {'}'};
{'}'}

// REDUCER

export default function messagesReducer (state = [], action) {'{'}

  switch (action.type) {'{'}

    case GET_MESSAGES:
      return action.messages;

    case GET_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  {'}'}

{'}'}

&lt;/pre&gt;
&lt;/hint&gt;
&lt;hint title="index.js"&gt;
```js
import {'{'}
  createStore,
  applyMiddleware,
  combineReducers
{'}'} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {'{'} composeWithDevTools {'}'} from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';

const reducer = combineReducers({'{'}
  messages
{'}'});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

```
&lt;/hint&gt;

Try the rest on your own!

Also, can you make it so that you don't need to refactor all of the files that use our action creators?

&lt;hint title="Approach"&gt;
Did you know that you can `export` the exports of another module?

For example, in `store/index.js`, if you say `export * from './messages'`, this will cause `index.js` to export all of the functions that `messages.js` exports! Whoa!

Following the example above, this means `index.js` would look like:

```js
import {'{'}
  createStore,
  applyMiddleware,
  combineReducers
{'}'} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {'{'} composeWithDevTools {'}'} from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';

const reducer = combineReducers({'{'}
  messages
{'}'});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

// store is exported by default
export default store;

// ...but we also export everything from messages!
export * from './messages';
```
&lt;/hint&gt;</Action></Concept>
    <Concept name="Bonus">
    <Action name="Refactor">Get some more practice using connect - refactor the other components that currently import the store directly, and make them use connect instead.</Action>
    <Action name="Channel Name in the Navbar">You've come so far! Try to accomplish the bonus goal of syncing up the channel name in the navbar. This could actually be a bit tricky! Consider this an extra challenge!</Action>
    <Action name="Retro">Are there any bonus sections from StackChat part 1 that you didn't get to? Give them a go now!</Action></Concept>
    <Concept name="Composability Cookbook">
    <Action name="Intro">The following sections are **not necessary** to complete this workshop.

They are bonus readings that go over several advanced concepts, and are meant to be a reference as you continue your React journey. You may wish to read them now, or at some point in the future. They contain some thoughts (*including some opinions*) on how to take advantage of React's functional architecture to write components that are modular and DRY.

I hope you enjoy them and return to them every so often!</Action>
    <Action name="Handling Localized State">There are several form components in Juke (for example, the `input` to filter artists, or the `select` used to add songs to playlists.

We learned about the distinction that some developers make between `local state` and `application state` in [Juke Part 3: Forms](https://learn.fullstackacademy.com/workshop/581352f6b659df00039f5189/content/5820a141c9884c0003daac3a/text). When we throw the `redux` store into the fray, this distinction can become much more acute. While the `redux` store, at its strictest, is meant to be the single source of truth for **all** of the state in your application (from the identity of the logged in user, down to the lowliest `input` element), some developers don't like the idea of "polluting" their redux store with something as localized as form data. 

There are two schools of thought here:

1. We might choose to keep all of our `application state` in our Redux store, and write components that need local state as stateful React components (and use `setState` to update them). The upside of this approach is that it feels nice to not have to "clutter" our Redux store with state that feels ephemeral. The downside is that, strictly speaking, we no longer have a single source of truth for **all** the state in our app - we must be careful to make sure that our local state really is just local!

2. We might choose to be strict about keeping everything in our Redux store, and try to take advantage of the composability of reducers to work out a system that puts all of our local state in one place. For example, we might make a slice of state called "forms", and nest the local state for each form in our app there. The upside of this approach is that we don't lose any of the advantages that Redux has given us. The downside is that it requires more forethought and coordination. This is where libraries like [`redux-form`](http://redux-form.com/6.0.5/) come in - it introduces a reducer and several higher order components that tuck the state of our forms away in their own place.

Either one of these is a perfectly fine choice. All that I would suggest you do is that you be **consistent** with which approach you choose. It would be far more confusing if only *some* of your form data was handled in your `redux` store and *some* was handled by local state in a React class.</Action>
    <Action name="Localized State: Example">Say that we want to take a combined approach where we keep local form data in a React component's state, and manage our application's data in our `redux` store. Here is how we might combine our three types of components. Consider the following simple form:

**With no user submitted**
&lt;div&gt;
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/no-duke.png"/&gt;
&lt;/div&gt;
**After submitting a user**
&lt;div&gt;
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/duke.png"/&gt;
&lt;/div&gt;

In this example, our `redux` store will hold the `user`, but the data in the field will be held by a stateful React component.

1. A `connect` component written with `react-redux`, which exposes a way to `dispatch` changes to the `redux` store
2. A stateful React class that manages local form data
3. A stateless functional React component that displays the UI and connects event listeners

**Container.js**
```js
import {'{'} connect {'}'} from 'react-redux';
import {'{'} submitLoginActionCreator {'}'} from '../action-creators';
import StatefulFormClass from './StatefulFormClass';

const mapStateToProps = state =&gt; {'{'}
  return {'{'}
    // our main state.user
    user: state.user
  {'}'};
{'}'};

const mapDispatchToProps = dispatch =&gt; {'{'}
  return {'{'}
    // dispatches a change to our central `state.user` in the redux store
    submitLogin (userName) {'{'}
      dispatch(submitLoginActionCreator(userName));
    {'}'}
  {'}'};
{'}'};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatefulFormClass);
```

**StatefulFormClass.js**
```js
import React, {'{'} Component {'}'} from 'react';
import StatelessForm from './StatelessForm';

export default class StatefulFormClass extends Component {'{'}
  
  constructor (props) {'{'}
    super(props);
    this.state = {'{'}
      inputValue: '' // the entered user name
    {'}'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  {'}'}
  
  // updates our local state when the input form is changed
  handleChange (evt) {'{'}
    evt.preventDefault();
    this.setState({'{'}
      inputValue: evt.target.value
    {'}'});
  {'}'}
 
  // takes our local inputValue and passes it to the method from our connect component, 
  // which has access to `dispatch`
  handleSubmit (evt) {'{'}
    evt.preventDefault();
    this.props.submitLogin(this.state.inputValue);
  {'}'}
  
  render () {'{'}
    // passes down the local methods and inputValue, as well as the `user` from the store
    return (
      &lt;StatelessForm 
        user={'{'}this.props.user{'}'}
        inputValue={'{'}this.state.inputValue{'}'}
        handleSubmit={'{'}this.handleSubmit{'}'}
        handleChange={'{'}this.handleChange{'}'}
      /&gt;  
    );
  {'}'}
{'}'}
```

**StatelessForm.js**
```js
import React, {'{'} Component {'}'} from 'react';

export default function (props) {'{'}
  
  // a prop from our redux store
  const user = props.user; 
  
  // props from our local stateful component
  const inputValue = props.inputValue; 
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  
  return (
    &lt;div&gt;
    
      {'{'} user ? &lt;h3&gt;You are already logged in: {'{'} user {'}'}&lt;/h3&gt; : null {'}'}
      
      &lt;form onSubmit={'{'}handleSubmit{'}'}&gt;
        &lt;label htmlFor="username"&gt;Enter your name&lt;/label&gt;
        &lt;input value={'{'}inputValue{'}'} onChange={'{'}handleChange{'}'} /&gt;
        &lt;button type="submit"&gt;Submit&lt;/button&gt;
      &lt;/form&gt;
      
    &lt;/div&gt;
  );
{'}'}
```</Action>
    <Action name="Higher Order Components">A higher order component is still the same in concept as a higher order function - it's still just a function that returns another function. The only difference is that the function that a higher order component returns is a React class. Higher order functions are key to `composing re-usable functionality`.

As a refresher, here's how we might use a higher order function to compose different pieces of functionality.

Here's a piece of code we write fairly frequently:
```js
axios.get('/api/something').then(res =&gt; res.data)
```

Let's say we have a backend that contains `/api/puppies` and `/api/kittens`. We would like to be able to do something like this:
```js
getPuppies().then(puppies =&gt; console.log(puppies))
getKittens().then(kittens =&gt; console.log(kittens));
```

We *could* write each of these functions ourselves:
```
const getPuppies = () =&gt;
  axios.get('/api/puppies').then(res =&gt; res.data);

const getKittens = () =&gt;
  axios.get('/api/kittens').then(res =&gt; res.data);
```

Ugh, that was exhausting. We can do better - let's write a higher order function that will create arbitrary "api getters" for us.

```js
const createApiGetter = (resourceName) =&gt; {'{'}
  return () =&gt; {'{'}
    return axios.get(`api/${'{'}resourceName{'}'}`).then(res =&gt; res.data);
  {'}'}
{'}'}
```

*Or, even cleaner:*
```js
const createApiGetter = (resourceName) =&gt; () =&gt;
  axios.get(`api/${'{'}resourceName{'}'}`).then(res =&gt; res.data);
```

Now, if we want to create those API functions, all we need to say is this:
```js
const getPuppies = createApiGetter('puppies');
const getKittens = createApiGetter('kittens');
```

Ah, much better. It may look like an extra step when there are only puppies and kittens, but imagine if there were birds and turtles and hedgehogs and all sorts of resources we wanted to request.

Now let's take a look a generalized higher order component - this same logic applies:

```js
import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const higherOrderComponent = function (InnerComponent) {'{'}

  return function (props) {'{'}
    &lt;div&gt;
      {'{'}/* some view we want to share */{'}'}
      &lt;InnerComponent /&gt;
    &lt;/div&gt;
  {'}'}
{'}'}

const ComposedComponentA = higherOrderComponent(ComponentA);
const ComposedComponentB = higherOrderComponent(ComponentB);
```

In the next section, we'll look at a practical example.</Action>
    <Action name="Higher Order Components: Example">Consider the following simple (but modular) table component:

```js
// just an inline style
const boldStyle = {'{'} fontWeight: 700 {'}'};

const makeCell = (label) =&gt;
  &lt;td key={'{'}label{'}'}&gt;{'{'} label {'}'}&lt;/td&gt;

const makeRow = (row, headers) =&gt;
  &lt;tr key={'{'}row.id{'}'}&gt;{'{'} headers.map(header =&gt; makeCell(row[header])) {'}'}&lt;/tr&gt;

const Table = (props) =&gt; {'{'}

  const headers = props.headers;
  const rows = props.rows;

  return (
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr style={'{'}bold{'}'}&gt;
        {'{'} headers.map(makeCell) {'}'}
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
      {'{'} rows.map(row =&gt; makeRow(row, headers)) {'}'}
      &lt;/tbody&gt;
    &lt;/table&gt;
  );
{'}'}
```

We could use this to spin up a little table with any arbitrary data:

```js
const COL_HEADERS = ["name", "breed"]

const DOGS = [
  {'{'}
    name: 'Lexie',
    breed: 'Goldendoodle',
    id: 1
  {'}'},
  {'{'}
    name: 'Cody',
    breed: 'Pug',
    id: 2
  {'}'},
  {'{'}
    name: 'Ben',
    breed: 'Pitbull?',
    id: 3
  {'}'}
];

ReactDOM.render(
  &lt;Table rows={'{'}DOGS{'}'} headers={'{'}COL_HEADERS{'}'} /&gt;,
  document.getElementById('app')
);
```
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table.png"/&gt;

In our application, say that we sometimes want a table that looks just like the one we have above. But sometimes, we like to add a header to our components:

&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table-with-header.png"/&gt;

And we like to add headers to all kinds of components - not just tables! We want these headers to all be consistent, too.

We could just tack an `&lt;h3&gt;` tag in wherever we need it, but that could potentially lead to inconsistencies, and if we wanted to change the `&lt;h3&gt;` to an `&lt;h2&gt;` or something like that, we'd need to hunt them down everywhere. Instead, we could compose a component that will render the table with an arbitrary header. 

```js
const mixinTitle = (InnerComponent) =&gt; {'{'}
  return (props) =&gt; {'{'}
    const {'{'} title  {'}'} = props;

      return (
        &lt;div&gt;
          &lt;h3&gt;{'{'} title {'}'}&lt;/h3&gt;
          &lt;InnerComponent {'{'}...props{'}'} /&gt;
        &lt;/div&gt;
      );
  {'}'}
{'}'}
```

Now look how easy our life is:

```js
const TableWithTitle = mixinTitle(Table);

ReactDOM.render(
  &lt;TitleTable title="Dogs" rows={'{'}DOGS{'}'} headers={'{'}COL_HEADERS{'}'} /&gt;,
  document.getElementById('app')
);
```

What's great about this is that we can now add the same header to any component. All we need to do is compose it with the `mixinTitle` function and pass it the additional `title` prop:

```js
// consider this additional, simple component
const Greeting = (props) =&gt; {'{'}
  return &lt;p&gt;{'{'} props.message {'}'}&lt;/p&gt;
{'}'}

const TableWithTitle = mixinTitle(Table);
const ParagraphWithTitle = mixinTitle(Greeting);

ReactDOM.render(
  &lt;div&gt;
    &lt;TitleTable title="Dogs" rows={'{'}DOGS{'}'} headers={'{'}COL_HEADERS{'}'} /&gt;
    &lt;ParagraphWithTitle title="Greeting" message="Hello world" /&gt;
  &lt;/div&gt;,
  document.getElementById('app')
);
```

&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table%20and%20p.png"/&gt;</Action>
    <Action name="Higher Order Classes">As you may have inferred from the previous section, it is also possible to compose higher order components that return React classes (including classes that manage **state**) rather than just stateless components:

```js
import React from 'react';

const statefulMixin = function (InnerComponent) {'{'}
  return class StatefulWrapper extends React.Component {'{'}
    constructor (props) {'{'}
      super(props);
      this.state = {'{'}/** a higher order component frequently manages local state */{'}'}
      this.handleSomething = this.handleSomething.bind(this); // if this being passed to an event handler
    {'}'}

    handleSomething () {'{'}/** this might set our local state **/{'}'}

    render () {'{'}
    /** Remember our separation of concerns between stateful and presentational components.
        The higher order component's render function should only return the inner component
        decorated with any props the higher order component received and any state/behavior
        that it's managing. */
      return (
        &lt;InnerComponent
          handleSomething={'{'}this.handleSomething{'}'}
          {'{'}...this.props{'}'}
          {'{'}...this.state{'}'}
        /&gt;
      )
    {'}'}
  {'}'}
{'}'}
```

This is extremely powerful - this allows us to compose state and behavior rather than just presentational features. In the next section, we'll see how this can simplify the way we deal with form data.</Action>
    <Action name="Higher Order Classes: Example">Say that we have various form elements of various types, like the following:

&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/valid%20entry.png"/&gt;

These may just be small, versatile React components like these:

```js
const Input = (props) =&gt; {'{'}
  const {'{'} handleChange, value {'}'} = props;
  return &lt;input type="text" value={'{'}value{'}'} onChange={'{'}handleChange{'}'} /&gt;
{'}'};

const Select = (props) =&gt; {'{'}
  const {'{'} handleChange, value {'}'} = props;
  return (
    &lt;select value={'{'}value{'}'} onChange={'{'}handleChange{'}'}&gt;
      &lt;option value="puppies"&gt;Hug Puppies&lt;/option&gt;
      &lt;option value="kittens"&gt;Pet Kittens&lt;/option&gt;
      &lt;option value="annihilation"&gt;FIRE ZEE MISSILES!&lt;/option&gt;
    &lt;/select&gt;
  );
{'}'};
```

Now, we want to show an arbitrary warning message whenever an arbitrary condition has been met.
&lt;img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/warning%20entry.png"/&gt;

We could write two separate stateful components that perform this validation (one that renders the `Input` and one that renders the `Select`). But let's think in terms of composition: these two form elements share the same behavior. The only differences between them are:

1. How we determine when the current value is invalid
2. What message to show when the current value is invalid

If we imagine what this might look like as a React element, we might come up with this sort of interface:

```js
{'{'}/*
  `warningMessage` would just be a string with the custom message

  `validate` would be a function that accepts the value in the form, and returns true if we SHOULD show a warning,
  and false if we SHOULD NOT show a warning
*/{'}'}
&lt;InputOrSelect warningMessage={'{'}""{'}'} validate={'{'}(formValue) =&gt; {'{'}{'}'}{'}'} /&gt;
```

We have a good idea at this point how we would manage this functionality using local React state, but instead of writing separate classes to manage it, let's write a function that will return a class to manage that state/behavior instead:

```js
const validateMixin = (InnerComponent) =&gt; {'{'}

  const red = {'{'} color: 'red' {'}'}; // just an inline style

  return class extends Component {'{'}

    constructor (props) {'{'}
      super(props);
      this.state = {'{'}
        value: '',
        showWarning: false
      {'}'};
      this.handleChange = this.handleChange.bind(this);
    {'}'}

    handleChange (evt) {'{'}
      const value = evt.target.value;
      const {'{'} validate {'}'} = this.props;

      this.setState({'{'}
        value,
        showWarning: validate(value)
      {'}'});
    {'}'}

    render () {'{'}
      const {'{'} showWarning {'}'} = this.state;
      const {'{'} warningMessage {'}'} = this.props;

      return (
        &lt;div&gt;
          {'{'} showWarning && &lt;p style={'{'}red{'}'}&gt;{'{'} warningMessage {'}'}&lt;/p&gt; {'}'}
          &lt;InnerComponent {'{'}...this.state{'}'} {'{'}...this.props{'}'} handleChange={'{'}this.handleChange{'}'} /&gt;
        &lt;/div&gt;
      );
    {'}'}
  {'}'}
{'}'}
```

Now, whenever we want one of our form elements to have this warning behavior, we simply mix the form's component into the class. All we need to do is define the warning message, and the criteria for showing the warning:

```js
const Input = (props) =&gt; {'{'}
  const {'{'} handleChange, value {'}'} = props;
  return &lt;input type="text" value={'{'}value{'}'} onChange={'{'}handleChange{'}'} /&gt;
{'}'};

const Select = (props) =&gt; {'{'}
  const {'{'} handleChange, value {'}'} = props;
  return (
    &lt;select value={'{'}value{'}'} onChange={'{'}handleChange{'}'}&gt;
      &lt;option value="puppies"&gt;Hug Puppies&lt;/option&gt;
      &lt;option value="kittens"&gt;Pet Kittens&lt;/option&gt;
      &lt;option value="annihilation"&gt;FIRE ZEE MISSILES!&lt;/option&gt;
    &lt;/select&gt;
  );
{'}'};

const WarnableInput = validateMixin(Input);
// validate if the input is too long
const validateInput = (inputString) =&gt; inputString.length &gt; 16;

const WarnableSelect = validateMixin(Select);
// validate if we choose to destroy humanity
const validateSelect = (selected) =&gt; selected === 'annihilation';
```

Now look how easy we have it:

```js
ReactDOM.render(
  &lt;div&gt;
    &lt;WarnableInput warningMessage="This is too long" validate={'{'}validateInput{'}'} /&gt;
    &lt;WarnableSelect warningMessage="Maybe this is a bad idea?" validate={'{'}validateSelect{'}'} /&gt;
  &lt;/div&gt;,
  document.getElementById('app')
);
```</Action>
    <Action name="Self Documentation">You've heard it before - good code should be `self-documenting`. This means that the names you choose should read like human language, and make semantic sense for the thing you're trying to do. When it comes to writing functions, this applies not only to the name that you give the function, but also to the name you give the arguments. Consider the following horrible function:

```js
function doAThing () {'{'}
  const args = Array.prototype.slice.call(arguments);
  if (!args[0].length) return false;
  else return args[1](args[0]);
{'}'}
```

Ugh. We have no idea how to use this function. We need to read through the entire function's body to figure out what arguments it takes, if any, and it's not even clear what data types the function is expecting for those arguments.

Let's improve our lives a bit:
```js
function doAThing (someString, callbackFunc) {'{'}
  if (!someString.length) return false;
  else return callbackFunc(someString);
{'}'} 
```

Okay, this is better. We know without having to walk through the function's body that it expect to receive a string as the first argument, and a function as the second argument. It takes way less brain power to realize that this function returns false if the string has no length, and otherwise returns the result of invoking the callback function with the string. It's still a contrived, nonsense function but you get the picture.

React components are just functions, and the same rules apply. The challenging thing is that React components only accept an object called "props" as an argument, and this can make learning how to use a particular component just as hard as it was to learn how the function above worked.


**Quick:** what props does this component need to work?
```js
function MyComponent (props) {'{'}
  return (
    &lt;div className="container"&gt;
      &lt;label&gt;{'{'}props.label{'}'}&lt;/label&gt;
      &lt;input value={'{'}props.value{'}'} onChange={'{'}props.handleChange{'}'} /&gt;
      &lt;div className="form-control"&gt;
        &lt;button className={'{'}props.buttonClassName{'}'}&gt;Click Me&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
{'}'}
```

That wasn't very fun, was it? In the `Juke` workshops, you've probably encountered the following pattern (which avails itself of `destructured assignment`). 

```js
function MyComponent (props) {'{'}
  const {'{'} label, value, handleChange, buttonClassName {'}'} = props;

  return (
    &lt;div className="container"&gt;
      &lt;label&gt;{'{'}label{'}'}&lt;/label&gt;
      &lt;input value={'{'}value{'}'} onChange={'{'}handleChange{'}'} /&gt;
      &lt;div className="form-control"&gt;
        &lt;button className={'{'}buttonClassName{'}'}&gt;Click Me&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
{'}'}
```

This is way better. Not only does it clean up the namespace within JSX, but it also **clearly defines what props the component expects**. To learn how to use this component, you don't need to read much further than the first line to figure out what it takes for it to work.

We can do even better, too. We can destructure objects **in the function's definition** as well.


For example, here's a function that expects a config object:
```js
function configureApplication (configObj) {'{'}
  // uses configObj.lovesPuppies and configObj.lovesKittens
{'}'}
```

If we want to pass an object in as an argument, it would be helpful to know what fields the function is going to use. That function can be written to **destructure** the key-value pairs it wants to use directly into the scope of the function:

```js
function configureApplication ({'{'} lovesPuppies, lovesKittens {'}'}) {'{'}
  // uses lovesPuppies and lovesKittens directly
{'}'}
```

This function still expects to receive an object, but it makes it perfectly clear that it's expecting an object with keys for "lovesPuppies" and/or "lovesKittens".

Let's use this technique to perfect our component from before:

```js
function MyComponent ({'{'} label, value, handleChange, buttonClassName {'}'}) {'{'}
  return (
    &lt;div className="container"&gt;
      &lt;label&gt;{'{'}label{'}'}&lt;/label&gt;
      &lt;input value={'{'}value{'}'} onChange={'{'}handleChange{'}'} /&gt;
      &lt;div className="form-control"&gt;
        &lt;button className={'{'}buttonClassName{'}'}&gt;Click Me&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
{'}'}
```

Now not only is our namespace clear, but our eyes don't even need to enter the function now - we can tell exactly what props it expects in the declaration. If you're not used to the syntax, it may take some initial getting used to, but after that you'll want all of your stateless components to be written this way!

Note that we can only avail ourselves of this readability when we use stateless functional components, which is yet another reason why you should use them over classes whenever possible. (And of course don't forget **Tom's Second Law** by keeping them as dumb as can be!)</Action></Concept>
    <Concept name="Outro">
    <Action name="Final Thoughts">Engineering front-ends for applications in a way that's stable, scalable and maintainable is an extremely difficult task. This is because user interfaces, unlike (for example) RESTful web services, are inherently `stateful`, and managing state is hard.

`react` can be intimidating at first because it implements features of the functional programming paradigm (like `immutability` and `pure functions`) that allow you to reason about your UI as easily as you reason about functions: `render(state) =&gt; view`. That's all there is to it.

The tools you've learned to use throughout `StackChat` and `Juke` will help you write killer web applications, but you've also learned something bigger: the fundamentals of functional programming, and how to manage state to be predictable. You'll encounter many programs and even programming languages throughout your career that are stuck relying on procedural, imperative and object-oriented ways of thinking. The functional paradigm is powerful, and will serve you well for your entire career.</Action>
    <Action name="Resources">This section will undoubtedly grow… have any suggestions? Let us know!

* http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/</Action></Concept></Workshop>
