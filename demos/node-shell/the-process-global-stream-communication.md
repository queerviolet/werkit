In Unix environments, programs can communicate with streams called `STDIN`, `STDOUT`, and `STDERR` (Standard Input, Output, and Error). As the names imply, Standard Input is data flowing into the program and Standard Output is a channel for data coming out from the program. For a process started in the terminal, STDIN might be keyboard input, and STDOUT is displayed in the terminal as text.

Node.js gives us access to these streams in the form of [`process.stdin` and `process.stdout` objects](https://nodejs.org/api/process.html#process_process_stdout). In fact, Node's `console.log` is actually just a [thin wrapper around `stdout`](https://github.com/nodejs/node/blob/master/lib/console.js). You may not know much about streams, but for this workshop we only need to know how to read and write as shown below.


```js
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});
```

Type this out into your `bash.js` file and run `node bash.js` from the command line.  You should see something like this:

<terminal>
$ node bash.js
prompt > hello world
You typed: hello world
prompt >
</terminal>

Note that our process doesn't immediately end this time. That's because we've registered a *listener* to `stdin`, so Node won't kill the process automatically, as it assumes you may want to keep waiting for more user input. If you want to quit your Node prompt, use `^C` (CTRL+C is the Unix polite interrupt signal).

## Side Note: Command-Line Arguments

You may have found it already, but available on the `process` global is an array of arguments given to the starting of the process (in other words, the command entered in the terminal). This is `process.argv`.

Using `process.argv` we could in theory pass commands in straight from the bash prompt. For example, with `node bash.js pwd`, our file could get `pwd` from the correct index of `process.argv`, and produce the correct output. However, we will focus on getting our own "bash.js" prompt working.