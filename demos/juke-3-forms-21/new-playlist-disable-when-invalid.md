Let's add some validations. Since we're managing the input's value on our state, this shouldn't be too bad! The text input should be required and have no more than 16 characters. The submit button should be disabled if either of these validations fails.

<hint title="Approach">
Don't forget that `button` elements can take a prop called `disabled`, which will accept a boolean. Sounds like you could manage some state in the container component, or use the value prop that controls the input value.
</hint>

<guide>
The submit button becomes disabled when the input field is empty
The submit button becomes disabled when the input field contains more than 16 characters
</guide>