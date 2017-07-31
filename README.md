Werkit is a collection of tools for writing coding workshops.

Its current status is foetal.

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
  - [ ] Support markdown parsing in components
    - This is suboptimal; it'd be better if this happened at compile time. But it *has* to happen
      at runtime for markdown that's inlined, so we'll just handle them the same for now.
    - remarkable-react or remark-react?
      - remark-react looks like it has better syntax highlighting support
- [ ] Bonsai
  - [ ] Cut sections
  - [ ] Assemble branches
- [ ] Command line ergonomics for werkit
- [ ] Audit dependencies #chore
  