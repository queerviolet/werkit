# Embedded JSX

Here's an embedded JSX tag:

```js
const foo = &lt;Foo bar={3}/>
```

In the source, it has to look like `"&lt;Foo bar={3}/>"`.

# Code in hints

<hint title="the answer">
  You can nest code in hints:

  ```js
  const foo = &lt;Foo bar={3}/>
  ```
</hint>

# Nested hints

<hint title="a suggestion">
  Try this out:

  ```js
    fromJS({x: {}}).mergeDeep({x: {y: 3}})
  ```

  If that wasn't enough...

  <hint title="the solution">
    ```js
      fromJS({x: {}}).mergeDeep({x: {y: 3}})
    ```
  </hint>
</hint>

# Other HTML tags work normally
<ol>
  <li>2
  <li>3
</ol>
