At this point, you should be logging out the value of the input to the console. It's a shame that the field doesn't clear out when we click the submit button though. You might try setting the input value on your state to be an empty string when we submit, but you'll notice that this doesn't actually affect the value in the input field. To put it one way - changes to the input field are updating our field on state, but changes to our field on state aren't updating the input field! How can we change that?

In React parlance, a [`controlled component`](https://facebook.github.io/react/docs/forms.html#controlled-components) is a form field whose *value is managed by state*. This is very easy to do! All we have to do is pass the value from our state in as the `value` prop on the input element itself!

Give this a shot so that when you click the submit button, the input field clears out!

<hint title="Solution">
You'll need to pass down the input value you're managing on your state (let's call it `inputValue`. Then, in your `NewPlaylist` component...

<pre>
&ltinput value={props.inputValue} />
</pre>

Now the value in the input field will be the same as the inputValue on state. So, to get the value in the input field to clear, you just need to clear it on your state!
</hint>

<guide>
Clicking the submit button still causes the value of the field to be logged to the console, and then the input clears
</guide>