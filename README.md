Werkit is a collection of tools for writing coding workshops.

It's currently in its third trimester.

# Getting Started

This is a monorepo managed by lerna. Install lerna if you don't have it:

```sh
npm i -g lerna
```

Then setup this repo:

```sh
lerna bootstrap
```

Then you can run a demo workshop:

```sh
npm run kubo demos/pledge
```

The workshop will serve on [port 9876](http://localhost:9876).


# Things you can do

## Run a demo workshop

There are several workshops in this repo, in the [`demos`](./demos) folder. To run one,

```sh
npm run kubo demos/node-shell-v-20
```

The workshop will serve on [port 9876](http://localhost:9876).


## Import and run a learndot workshop

You can import and run a new learndot workshop in one fell swoop.

```sh
npm run learn.kubo <workshop-id>
```

The workshop will be imported into `demos` and served on
[port 9876](http://localhost:9876).


## Import a workshop from Learndot

```sh
node packages/learn.kubo <workshop-id>
```

This will convert the workshop to JSX and dump its files into a directory named
after it (`game-of-life`, for instance).


## Run a workshop

You can use kubo to serve any folder with JSX, kubo, or mmm
files. Try the [many minor matters documentation](./packages/many-matters),
for instance:

```sh
npm run kubo packages/many-matters/matters.mmm
```

Once started, you can view the workshop on [port 9876](http://localhost:9876).


# Development

It appears to be easy to break lerna's cross-package linkages when installing.
To avoid this, use this npm script to install packages in subpackages:

```sh
npm run add many-matters resolve
```

That will install the `resolve` npm in the `many-matters` subpackage, and re-run
`lerna bootstrap` to ensure everything stays happy.

## Re-download a workshop that's already been imported

You can re-import a workshop without going and finding its workshop id:

```sh
node packages/learn.kubo -u <path>
```

This relies on the presence of a `learn.id` file in the directory, created
by the importer.


# TODO

### Kubo
- [ ] Command line ergonomics
  - [ ] Should accept ports as flags
- [ ] Theming
  - This may be entirely subsumed by many matters theming, but will probably
    require some support in kubo.
- [ ] Help desk   
  - [ ] Plugins?
    - It may be easier to support help desk with a plugin.

### Many matters
- [X] Webpack loader
  - [X] Async
  - [X] Inclusions
- [ ] Func/Exec blocks
- [ ] Theming
  - This will be a mapping of names to modules

### Chores
- [ ] Audit dependencies
- [ ] Figure out if this npm add script is really necessary?

### Bonsai
- [ ] Cut sections
- [ ] Assemble branches  
- [ ] Figure out appropriate clip sentinels for common languages
- [ ] Specify assembly instructions