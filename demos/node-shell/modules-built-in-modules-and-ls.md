Every programming language will come with a standard library of modules that make your work as a developer much easier (and of course, Node's standard library is considered very powerful for web type of development).

One of the most powerful modules available in Node is the [`fs` module](https://nodejs.org/api/fs.html). This *built-in Node module* allows us to access the machine's file system in varied and powerful ways. This is definitely not something you can do in the browser!

You'll use the `fs` module to implement the next, very familiar command: `ls`. Take the same steps as our `pwd` command to scaffold. That means:

- Create a new function called `ls` in `commands.js`
- When the user types in `ls`, execute the `ls` function 

Don't forget, `fs` is not a global (like `process`) but a module — that means you'll need to `require` it: `var fs = require('fs');`

# Implementing `ls`

You can use `fs.readdir` to get the files in a directory.

``` javascript
fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt > ");
});
```

**NOTE**: do not omit the error-handling aspect of Node-style callback functions ("errbacks")! The reason they make you write `err` first is to never forget to handle that potential `err` somehow — even if you simply `throw` it to the execution stack. Otherwise, you can have *silent errors*, which are as difficult to debug as they sound.