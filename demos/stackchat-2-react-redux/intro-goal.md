For this workshop, we will be introducing the `react-redux` library to replace the boilerplate for subscribing our components to the store with `connect` components.

We'll do lots of refactoring of old code to practice, but first - we'll write our first `connect` component by implementing some new features.

We've added a new Route that renders a component for adding new channels:

<h5>Starting Point</h5>
<img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux-start.png" />

We have three main tasks:

1. Channels should no longer be hardcoded we'll fetch them from the server
2. Allow a user to create a new channel
3. **Bonus**: The selected channel name should display in the top nav

<h5>Goals 1 and 2</h5>
<img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux1-1.png" />

<h5>Goal 3 (Bonus)</h5>
<img src="https://learndotresources.s3.amazonaws.com/workshop/591c4d7633a48d0004c39898/reactredux2.png" />