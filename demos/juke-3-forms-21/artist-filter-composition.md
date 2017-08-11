The filter we write should look something like this:

<h3>Before typing anything in</h3>
<img src="https://learndotresources.s3.amazonaws.com/workshop/581352f6b659df00039f5189/Screen%20Shot%202016-11-09%20at%202.13.54%20PM.png">

<h3>After typing in an entry</h3>
<img src="https://learndotresources.s3.amazonaws.com/workshop/581352f6b659df00039f5189/Screen%20Shot%202016-11-09%20at%202.14.07%20PM.png">

Your first instinct might be to go ahead and modify the `Artists` component. However, the artist's component is already quite good at its job: if we give it a `props.artists`, it will render our list of artists. Why change it?

Instead, let's take advantage of React's functional nature and *compose*. We know what this looks like with regular functions at this point:

```js
// the add something function is very good at adding x and y
function addSomething (x, y) {
  return x + y;
}

// the logSomething function is very good at logging z to the console
function logSomething (z) {
  console.log(z);
}

// we can compose their functionality into one function
function addAndLog (x, y) {
  logSomething(addSomething(x, y));
}
```

In this same vein, we'll write a new, **stateful** component that will manage the value of the filter's input, filter the artist's array, and then pass the filtered array of artists down to the `Artists` component.

<guide>
You have finished reading the above
</guide>