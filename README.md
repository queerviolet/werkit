Werkit is a collection of tools for writing coding workshops.

Its current status is foetal.

# Setup

This is a monorepo managed by lerna. Install it if you don't have it:

```sh
npm i -g lerna
```

Then setup this repo:

```sh
lerna bootstrap
```

# Import a workshop from Learndot

```sh
node packages/learn.werkit <workshop-id>
```

This will convert the workshop to JSX and dump its files into a directory named
after it (`game-of-life`, for instance).

# Run the workshop

```sh
node packages/werkit my-workshop/index.jsx
```

Werkit currently only accepts a JSX file on the command line (this will change).

Once started, you can view the workshop on [port 9876](http://localhost:9876).

# TODO

- [X] Refactor with lerna
  - [X] Move components out of root and into werkit
  - [X] Move ProviderPlugin out of rxquire and into werkit
- [X] Give Concepts, Actions keys #importing
- [ ] Markdown -> JSX converter
  - [X] Refactor serializer with state machine
  - [X] Webpack integration
    - [X] `require()` markdown  
    - [X] `require()` images
    - [X] Loader rxquire config option
  - [X] Support markdown parsing in components
    - This is suboptimal; it'd be better if this happened at compile time. But it *has* to happen
      at runtime for markdown that's inlined, so we'll just handle them the same for now.
    - remarkable-react or remark-react?
      - remark-react looks like it has better syntax highlighting support
    - Everything sucked and I just did this myself, parsing marked -> HTML -> JSX.
- [ ] Bonsai
  - [ ] Cut sections
  - [ ] Assemble branches
- [ ] Command line ergonomics for werkit
- [ ] Audit dependencies #chore
  