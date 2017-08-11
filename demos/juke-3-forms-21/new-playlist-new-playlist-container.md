The `NewPlaylist` component is a form, so let's write another `container` component to contain the current value of the input. Here's what we'll need:

1. A state field for the input value
2. A method to set the input value on state when the input changes (just like the FilterInput component)
3. A method to do something with the input value when the form is submitted (this will get passed as the `onSubmit` prop to the `<form>` element - **not** to the `<button>`)

For now, let's just try to get it so that when we submit the form, we just `console.log` the value in the form. Go for it!


<hint title="Why is my screen refreshing when I handle the submit!?!">
Remember that the native HTML behavior for an `onsubmit` listener will cause the screen to refresh - an unfortunate throwback to the time before SPAs. You can prevent this by invoking `preventDefault` on the event object.
</hint>

<guide>
Clicking submit causes the value in the input field to be logged to the console (without causing the screen to refresh as well)
</guide>