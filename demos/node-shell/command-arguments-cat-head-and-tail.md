Refactor all your existing functions to take one explicit parameter — even if they do not actually use such a parameter. Why? We are going to make all our command functions share the same *signature* (order & type of parameters) so that we can call them all the same way, without knowing necessarily which one we are calling. For most of the upcoming functions, it will make sense to name that parameter `file` or `filename` or similar.

---

Three powerful commands that take in one argument are `cat filename`, `head filename` and `tail filename`. 

## cat filename.txt

The `cat` command is simple: given the command `cat filename.txt`, it will output the *contents* of `filename.txt`. More information can be found [here](http://www.linfo.org/cat.html).

Figure out, using `fs`, how to implement this command for one file argument.

As extra credit, you can also attempt to let `cat` accept a space-delimited string of filenames to read. This may be more challenging, especially if you make sure that the `prompt >` is only printed *after* all files, and even more tricky, maintaining the original filename order (no `readFileSync` allowed!).

## head filename.txt

The `head` command outputs the first N lines of the filename.txt (default is 10 on most systems). This function will be similar to `cat` but only return the first N lines — let's make ours 5 for now.

## tail filename.txt

The `tail` command is the inverse of the head command.  It outputs the last N lines of the filename.txt. Our bash.js `tail` command will print the last 5 lines.

As an aside, one of the most useful things that the real `tail` can do is watch log files; if you have a program outputting to a text file and you want to watch that file live, you can use `tail -f logfile` where `-f` means `follow`.