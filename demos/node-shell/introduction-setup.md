This workshop will be built completely from an empty directory, no git forking or cloning needed! However, you do want to make your directory a git project. Let's go through the steps:

```sh
mkdir node-shell # create a new directory named `node-shell`
cd node-shell # switch into this directory
touch bash.js # create a new file
git init # creates a .git file in the current directory
git add bash.js
git commit -m "added bash.js file"
git log # shows the commit you just made
```