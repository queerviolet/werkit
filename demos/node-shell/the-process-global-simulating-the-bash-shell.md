We'd like to build a system that works like this:

<terminal>
$ node bash.js
my_prompt: ls
.git
bash.js
</terminal>

When we type `$ node bash.js` we enter a program that outputs `my_prompt:`. Then our program will be able to listen for various commands and respond! How are we outputting the prompt and getting information back? Let's explore the `process` global that exists in all `node` programs.