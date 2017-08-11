[`request`](https://www.npmjs.com/package/request) is a cool, simple package that allows us to easily make requests to other sites.  Read the [Github README](https://github.com/request/request) to get a flavor of how it's used.
 
To install `request` into your project, you'll have to do a few things in your terminal:
 
- run `npm init`. This will take you through a quick step-by-step that will create a `package.json` file. Read a bit about what this file is [here](https://docs.npmjs.com/files/package.json).

- run `npm install request --save`. This will contact npm and download the `request` library. A new directory in your project will be created called `node_modules`, this is where npm places all third-party modules to be used in your program. The `--save` is a **command option** that states that npm should save `request` at a specific version as a dependency to your project. Check out your `package.json` after your install has completed.

- In your `commands.js`, you can now use the statement `require('request')` to gain access to the `request` library. Sweet!