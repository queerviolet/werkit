You've heard it before - good code should be `self-documenting`. This means that the names you choose should read like human language, and make semantic sense for the thing you're trying to do. When it comes to writing functions, this applies not only to the name that you give the function, but also to the name you give the arguments. Consider the following horrible function:

```js
function doAThing () {
  const args = Array.prototype.slice.call(arguments);
  if (!args[0].length) return false;
  else return args[1](args[0]);
}
```

Ugh. We have no idea how to use this function. We need to read through the entire function's body to figure out what arguments it takes, if any, and it's not even clear what data types the function is expecting for those arguments.

Let's improve our lives a bit:
```js
function doAThing (someString, callbackFunc) {
  if (!someString.length) return false;
  else return callbackFunc(someString);
} 
```

Okay, this is better. We know without having to walk through the function's body that it expect to receive a string as the first argument, and a function as the second argument. It takes way less brain power to realize that this function returns false if the string has no length, and otherwise returns the result of invoking the callback function with the string. It's still a contrived, nonsense function but you get the picture.

React components are just functions, and the same rules apply. The challenging thing is that React components only accept an object called "props" as an argument, and this can make learning how to use a particular component just as hard as it was to learn how the function above worked.


**Quick:** what props does this component need to work?
```js
function MyComponent (props) {
  return (
    <div className="container">
      <label>{props.label}</label>
      <input value={props.value} onChange={props.handleChange} />
      <div className="form-control">
        <button className={props.buttonClassName}>Click Me</button>
      </div>
    </div>
  );
}
```

That wasn't very fun, was it? In the `Juke` workshops, you've probably encountered the following pattern (which avails itself of `destructured assignment`). 

```js
function MyComponent (props) {
  const { label, value, handleChange, buttonClassName } = props;

  return (
    <div className="container">
      <label>{label}</label>
      <input value={value} onChange={handleChange} />
      <div className="form-control">
        <button className={buttonClassName}>Click Me</button>
      </div>
    </div>
  );
}
```

This is way better. Not only does it clean up the namespace within JSX, but it also **clearly defines what props the component expects**. To learn how to use this component, you don't need to read much further than the first line to figure out what it takes for it to work.

We can do even better, too. We can destructure objects **in the function's definition** as well.


For example, here's a function that expects a config object:
```js
function configureApplication (configObj) {
  // uses configObj.lovesPuppies and configObj.lovesKittens
}
```

If we want to pass an object in as an argument, it would be helpful to know what fields the function is going to use. That function can be written to **destructure** the key-value pairs it wants to use directly into the scope of the function:

```js
function configureApplication ({ lovesPuppies, lovesKittens }) {
  // uses lovesPuppies and lovesKittens directly
}
```

This function still expects to receive an object, but it makes it perfectly clear that it's expecting an object with keys for "lovesPuppies" and/or "lovesKittens".

Let's use this technique to perfect our component from before:

```js
function MyComponent ({ label, value, handleChange, buttonClassName }) {
  return (
    <div className="container">
      <label>{label}</label>
      <input value={value} onChange={handleChange} />
      <div className="form-control">
        <button className={buttonClassName}>Click Me</button>
      </div>
    </div>
  );
}
```

Now not only is our namespace clear, but our eyes don't even need to enter the function now - we can tell exactly what props it expects in the declaration. If you're not used to the syntax, it may take some initial getting used to, but after that you'll want all of your stateless components to be written this way!

Note that we can only avail ourselves of this readability when we use stateless functional components, which is yet another reason why you should use them over classes whenever possible. (And of course don't forget **Tom's Second Law** by keeping them as dumb as can be!)