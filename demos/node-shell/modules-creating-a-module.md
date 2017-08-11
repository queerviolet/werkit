Node has a built-in module system. This [video](https://egghead.io/lessons/nodejs-commonjs-basics-introduction) and this [article](http://www.sitepoint.com/understanding-module-exports-exports-node-js/) are a good introduction to how it works.

- Create a new file called `commands.js` and move the logic for the `pwd` command into this file. For the time being, include printing the next `prompt >` in that logic.

- This `commands.js` file should **module.exports** an **object** containing a function `pwd` with the logic for our `pwd` command.
 
- Wire up `bash.js` so if the user types in a command `pwd`, it accesses that command function in the object coming from `commands.js` and calls it.

<hint title="Exporting functions">

In `commands.js` your code should look something like this:

``` javascript
module.exports = {
  pwd: function() {
    // pwd code
  }
}
```

</hint>


<hint title="Running commands from bash.js">
In `bash.js`, you can access `commands.js` like so:

``` javascript
var commands = require('./commands');
var userCommand = 'pwd';
commands[userCommand]();
```

</hint>


