Now that we've got a loadable state for a single playlist, let's make it so that as soon as someone creates a new playlist, they get taken to that playlist's view. Essentially we are looking for a "frontend redirect".

Did you know that we can directly manipulate the history object (`hashHistory`) that `react-router` gives us? Check out [this section](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating) of the tutorial for a nice reminder of how to do this.

<guide>
When you click submit to create a new playlist, the newly created playlist is rendered into view
</guide>