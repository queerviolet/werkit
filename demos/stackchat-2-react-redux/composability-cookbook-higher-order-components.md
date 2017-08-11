A higher order component is still the same in concept as a higher order function - it's still just a function that returns another function. The only difference is that the function that a higher order component returns is a React class. Higher order functions are key to `composing re-usable functionality`.

As a refresher, here's how we might use a higher order function to compose different pieces of functionality.

Here's a piece of code we write fairly frequently:
```js
axios.get('/api/something').then(res => res.data)
```

Let's say we have a backend that contains `/api/puppies` and `/api/kittens`. We would like to be able to do something like this:
```js
getPuppies().then(puppies => console.log(puppies))
getKittens().then(kittens => console.log(kittens));
```

We *could* write each of these functions ourselves:
```
const getPuppies = () =>
  axios.get('/api/puppies').then(res => res.data);

const getKittens = () =>
  axios.get('/api/kittens').then(res => res.data);
```

Ugh, that was exhausting. We can do better - let's write a higher order function that will create arbitrary "api getters" for us.

```js
const createApiGetter = (resourceName) => {
  return () => {
    return axios.get(`api/${resourceName}`).then(res => res.data);
  }
}
```

*Or, even cleaner:*
```js
const createApiGetter = (resourceName) => () =>
  axios.get(`api/${resourceName}`).then(res => res.data);
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

const higherOrderComponent = function (InnerComponent) {

  return function (props) {
    <div>
      {/* some view we want to share */}
      <InnerComponent />
    </div>
  }
}

const ComposedComponentA = higherOrderComponent(ComponentA);
const ComposedComponentB = higherOrderComponent(ComponentB);
```

In the next section, we'll look at a practical example.