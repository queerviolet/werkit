We've come to the hardest step in this workshop, communicating between commands using piping.

## Step 1: Improve our command parser

We have to now handle commands like `cat bash.js | head`.  That means we need to split our `cmdString` into multiple command-argument groups separated by the `|` operator.

Here's a regular expression for `split` that will do that for you:

``` javascript
var cmdString = d.toString().trim();
var cmdList = cmdString.split(/\s*\|\s*/g) // any amount of whitespace, pipe, any amount of whitespace
```

Now `cmdList` is an array of command-argument strings that we want to parse and run.

## Step 2: Add a third argument to all your commands

Add a parameter named `stdin` as the first argument to all your commands: `ls: function(stdin, file, done)`. (To be clear: this isn't the real `process.stdin`, we are simulating the idea of process I/O using pipes.)  For commands that can take `stdin` (so far, that's `head`, `tail`, `sort`, `uniq`, `wc`), you'll need to check if the `stdin` and/or `file` arguments are defined, and use one of them.

## Step 3: Modify your `done` function

Now your `done` function should check if there are any remaining commands & arguments in `cmdList`.  If there are, run that command (and argument, if there is one) and pass its output (analagous to `stdout`) as the `stdin` parameter for the next command. This will definitely test your ability with functional programming, string parsing, asynchronous callbacks, etc. Good luck!

## Step 4: Test your program

See if these work:

<terminal>
$ node bash.js
prompt > cat bash.js | head
var stdin = process.stdin;
var stdout = process.stdout;
var fs = require('fs');

commands = {
prompt > cat bash.js | head | wc
5

</terminal>