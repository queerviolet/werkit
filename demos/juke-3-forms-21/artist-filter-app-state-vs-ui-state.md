Up until now, we've kept all of the state of our application centralized in the `AppContainer` component. This is important because it allows us to easily transport our application's state to the different components that need them, and it also helps make sure that our dumb components remain nice and dumb. However, sometimes we know that some kinds of state are going to be localized to particular area of our app ahead of time - state like form data, timers, small animations, etc. It would be a shame to clutter up the already busy `AppContainer` component with the state for a single input.

Some developers like to make the distinction between what we might call our `application state`, or state that's central to our app and may be available to various different components, and `UI state` or `local state` - this would be state that we only need to handle our UI in a single place - things like forms would often be considered local state.

Let's go ahead and write a component that manages localized state. We'll add a feature to our `Artists` component that will allow us to start typing the name of an artist into an input field, and the list of artists will narrow down to only those artist(s) whose names match our entry.

<guide>
You have finished reading the above
</guide>