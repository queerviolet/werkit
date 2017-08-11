Create a new presentational component called `FilterInput` - add it to the `react/components/` directory:

```js
import React from 'react';

const FilterInput = (props) => {
  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        className="form-control"
        placeholder="Enter artist name"   
      />
    </form>
  );
}

export default FilterInput;
```

Now we're going to write our first new `container` (read: "stateful") component to our `react/containers` directory - give it a sensible name like `FilterableArtistsContainer.js`. This stateful component is going to *compose* our `FilterInput` and `Artists` together by managing the state of the input form, and then filtering the list of artists it passes to `Artists`.

**But first**, let's learn about the React `SyntheticEvent`!

<guide>
You have created the FilterInput presentational component
You have created a file for the FilterableArtists container (but not written the component yet)
</guide>