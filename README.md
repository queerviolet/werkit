Werkit is a collection of tools for writing coding workshops.

It's currently in its third trimester.

# Getting Started

```sh
npm install
```

The first time you `npm install`, your browser will open with documentation.

# Set up aliases

If you're working with kubo from this repository, it can be helpful to set up
aliases. There's a script for this:

```sh
$(node scripts/alias)
```

You must run it with the `$()` around it. This will cause the shell in your
current terminal to set up aliases for `kubo`, `learn.import`, and `mmm`,
all pointed at *this directory*. 

(To see all the aliases it creates, `cat .aliases`.)


# Things you can do

These assume that you have [set up your aliases](#set-up-aliases).

If you haven't, you can use `npm run kubo` instead of `kubo`, for much the same
effect.

## Run a demo workshop

There are several workshops in this repo, in the [`demos`](./demos) folder. To run one,

```sh
kubo demos/pledge
```

## Import and run a learndot workshop

You can import and run a new learndot workshop in one fell swoop.

```sh
npm run learn.kubo ${workshop_id}
```

The workshop will be imported into `demos` and kubo will launch serving it.

## Import a workshop from Learndot into demos

```sh
npm run learn.kubo ${workshop_id}
```

This will convert the workshop to JSX and dump its files into a directory named
after it (`demos/game-of-life`, for instance).

## Import a workshop from Learndot anywhere

```sh
learn.kubo ${workshop_id}
```

This will import the workshop into the current dir, in a directory based on its
title (`./game-of-life`, for instance).

```sh
learn.kubo -d somewhere/else/:title ${workshop_id}
```

Will import into `somewhere/else/game-of-life`, for instance

```sh
learn.kubo -d .kubo ${workshop_id}
```

Will import into `.kubo`, ignoring the workshop's title.


## Run a workshop

You can use kubo to serve any folder with JSX, kubo, or mmm
files. Try the [many minor matters documentation](./packages/many-matters),
for instance:

```sh
kubo packages/many-matters/matters.mmm
```


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
learn.kubo -u ${path}
```

This relies on the presence of a `learn.id` file in the directory, created
by the importer.