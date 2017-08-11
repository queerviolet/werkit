The first two bash commands we'll implement in our *node-shell* program are `pwd` and `date`. 

Try running these commands in your terminal:

- [`pwd`](https://en.wikipedia.org/wiki/Pwd)
- `date`

Let's now make running `node bash.js` mimic this functionality. Whenever the user types one of those two commands, execute the code necessary to generate the data and output it to the terminal.  When the command is done running, output the prompt again.

<terminal>
$ node bash.js
prompt > pwd
/Users/you/dev/node-shell
prompt > date
Mon Aug 01 2015 05:50:13 GMT-0400 (EDT)
prompt >

</terminal>

<hint title="Getting the working directory">
The process's *current working directory* (hint hint) should be available using some *method* on the `process` global. See if you can find it in the [Node docs](https://nodejs.org/api/process.html)!
</hint>