**This page is 100% theory (no actions required).**

Earlier, you answered a prompt about STDIN/STDOUT. In that prompt, we examined the difference between:

<terminal>
$ cat bash.js
$ head bash.js
$ cat bash.js | head

</terminal>

The key difference is that in line 3, the `cat bash.js` STDOUT stream becomes the STDIN stream of the `head` program and so `head` doesn't need to have a file argument. In other words, UNIX programs like `cat` and `wc` get their STDIN data from *one of two typical sources*: arguments and/or piping.

<terminal>
$ wc bash.js
number of lines / words / characters in bash.js appear here
$ echo 'hello world' | wc
number of lines / words / characters in 'hello world' appear here
</terminal>

You might wonder, what happens if a UNIX command is both given an argument AND has data piped to it — which "wins"? Let's try it out for `wc`:

<terminal>
$ echo 'hello world' | wc bash.js
number of lines / words / characters in bash.js, NOT 'hello world', appear here
</terminal>

It seems that explicit arguments are used over piped data for many (but not all!) commands. For implementing the commands in this workshop (next step), you can research what behavior their UNIX counterparts exhibit and/or decide on what makes the most sense to you.