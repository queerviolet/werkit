Before we go any further, let's take a moment to learn about the **second** argument that `connect` passes to both `mapStateToProps` and `mapDispatchToProps`. It's called `ownProps`.

In addition to `state` as its first parameter, `mapStateToProps` functions can also expect to receive an object called `ownProps` in the second parameter.

```js
function mapStateToProps = function (state, ownProps) {
  return {
    // etc...
  };
}
```

Likewise, `mapDispatchToProps` receives the **same** thing.
```js
function mapDispatchToProps = function (dispatch, ownProps) {
  return {
    // etc...
  };
}
```

This is so that container components can accept props of their own (for example, from other components we write, or from `react-router` if a container is mounted under a `Route`).

Consider this example:

```js
import FoodListContainer from '../containers/FoodListContainer';

export default function MyFavoriteFoods (props) {

  // ["bagels", "chocolate", "key lime pie"]
  // ...in case anyone was wondering
  const myFavoriteFoods = props.myFavoriteFoods;

  return (
    <div>
      <h3>Blah Blah Blah</h3>
      <FoodListContainer favorites={myFavoriteFoods} />
    </div>
  );
}
```

Now, if `FoodListContainer` is a `connect` component, we will have access to "myFavoriteFoods" as `ownProps.favorites`:

```js
const mapStateToProps = function (state, ownProps) {
  return {
    favorites: ownProps.favorites, // ["bagels", "chocolate", "key lime pie"]
    hasHealthyDiet: ownProps.favorites.indexOf("broccoli") !== -1 // false :(
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    changeDiet: function () {
      dispatch(changeDietActionCreator(ownProps.favorites))
    }
  };
}
```

Sound good? Then onward!

<guide>
You have read and understood the above
</guide>