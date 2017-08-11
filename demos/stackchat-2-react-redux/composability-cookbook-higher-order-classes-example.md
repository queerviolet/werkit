Say that we have various form elements of various types, like the following:

<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/valid%20entry.png"/>

These may just be small, versatile React components like these:

```js
const Input = (props) => {
  const { handleChange, value } = props;
  return <input type="text" value={value} onChange={handleChange} />
};

const Select = (props) => {
  const { handleChange, value } = props;
  return (
    <select value={value} onChange={handleChange}>
      <option value="puppies">Hug Puppies</option>
      <option value="kittens">Pet Kittens</option>
      <option value="annihilation">FIRE ZEE MISSILES!</option>
    </select>
  );
};
```

Now, we want to show an arbitrary warning message whenever an arbitrary condition has been met.
<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/warning%20entry.png"/>

We could write two separate stateful components that perform this validation (one that renders the `Input` and one that renders the `Select`). But let's think in terms of composition: these two form elements share the same behavior. The only differences between them are:

1. How we determine when the current value is invalid
2. What message to show when the current value is invalid

If we imagine what this might look like as a React element, we might come up with this sort of interface:

```js
{/*
  `warningMessage` would just be a string with the custom message

  `validate` would be a function that accepts the value in the form, and returns true if we SHOULD show a warning,
  and false if we SHOULD NOT show a warning
*/}
<InputOrSelect warningMessage={""} validate={(formValue) => {}} />
```

We have a good idea at this point how we would manage this functionality using local React state, but instead of writing separate classes to manage it, let's write a function that will return a class to manage that state/behavior instead:

```js
const validateMixin = (InnerComponent) => {

  const red = { color: 'red' }; // just an inline style

  return class extends Component {

    constructor (props) {
      super(props);
      this.state = {
        value: '',
        showWarning: false
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
      const value = evt.target.value;
      const { validate } = this.props;

      this.setState({
        value,
        showWarning: validate(value)
      });
    }

    render () {
      const { showWarning } = this.state;
      const { warningMessage } = this.props;

      return (
        <div>
          { showWarning && <p style={red}>{ warningMessage }</p> }
          <InnerComponent {...this.state} {...this.props} handleChange={this.handleChange} />
        </div>
      );
    }
  }
}
```

Now, whenever we want one of our form elements to have this warning behavior, we simply mix the form's component into the class. All we need to do is define the warning message, and the criteria for showing the warning:

```js
const Input = (props) => {
  const { handleChange, value } = props;
  return <input type="text" value={value} onChange={handleChange} />
};

const Select = (props) => {
  const { handleChange, value } = props;
  return (
    <select value={value} onChange={handleChange}>
      <option value="puppies">Hug Puppies</option>
      <option value="kittens">Pet Kittens</option>
      <option value="annihilation">FIRE ZEE MISSILES!</option>
    </select>
  );
};

const WarnableInput = validateMixin(Input);
// validate if the input is too long
const validateInput = (inputString) => inputString.length > 16;

const WarnableSelect = validateMixin(Select);
// validate if we choose to destroy humanity
const validateSelect = (selected) => selected === 'annihilation';
```

Now look how easy we have it:

```js
ReactDOM.render(
  <div>
    <WarnableInput warningMessage="This is too long" validate={validateInput} />
    <WarnableSelect warningMessage="Maybe this is a bad idea?" validate={validateSelect} />
  </div>,
  document.getElementById('app')
);
```