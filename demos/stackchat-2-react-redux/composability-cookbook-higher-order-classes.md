As you may have inferred from the previous section, it is also possible to compose higher order components that return React classes (including classes that manage **state**) rather than just stateless components:

```js
import React from 'react';

const statefulMixin = function (InnerComponent) {
  return class StatefulWrapper extends React.Component {
    constructor (props) {
      super(props);
      this.state = {/** a higher order component frequently manages local state */}
      this.handleSomething = this.handleSomething.bind(this); // if this being passed to an event handler
    }

    handleSomething () {/** this might set our local state **/}

    render () {
    /** Remember our separation of concerns between stateful and presentational components.
        The higher order component's render function should only return the inner component
        decorated with any props the higher order component received and any state/behavior
        that it's managing. */
      return (
        <InnerComponent
          handleSomething={this.handleSomething}
          {...this.props}
          {...this.state}
        />
      )
    }
  }
}
```

This is extremely powerful - this allows us to compose state and behavior rather than just presentational features. In the next section, we'll see how this can simplify the way we deal with form data.