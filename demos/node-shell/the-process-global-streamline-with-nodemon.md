As you are developing your `bash.js`, you may find it annoying to keep doing:

1. `node bash.js`
* test a command
* write some code in `bash.js` 
* CTRL+C to gracefully quit the running process
* `node bash.js`
* re-test the command

Luckily, the [nodemon](https://www.npmjs.com/package/nodemon) npm module is here to help. Simply install it globally:

```sh
npm install -g nodemon
```

And now run `nodemon bash.js`. Nodemon watches files in a directory, recursively, and if they change it stops the process and re-runs your original command. Voilà, instant refreshing prompt during development!