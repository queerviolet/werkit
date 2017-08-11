Consider the following simple (but modular) table component:

```js
// just an inline style
const boldStyle = { fontWeight: 700 };

const makeCell = (label) =>
  <td key={label}>{ label }</td>

const makeRow = (row, headers) =>
  <tr key={row.id}>{ headers.map(header => makeCell(row[header])) }</tr>

const Table = (props) => {

  const headers = props.headers;
  const rows = props.rows;

  return (
    <table>
      <thead>
        <tr style={bold}>
        { headers.map(makeCell) }
        </tr>
      </thead>
      <tbody>
      { rows.map(row => makeRow(row, headers)) }
      </tbody>
    </table>
  );
}
```

We could use this to spin up a little table with any arbitrary data:

```js
const COL_HEADERS = ["name", "breed"]

const DOGS = [
  {
    name: 'Lexie',
    breed: 'Goldendoodle',
    id: 1
  },
  {
    name: 'Cody',
    breed: 'Pug',
    id: 2
  },
  {
    name: 'Ben',
    breed: 'Pitbull?',
    id: 3
  }
];

ReactDOM.render(
  <Table rows={DOGS} headers={COL_HEADERS} />,
  document.getElementById('app')
);
```
<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table.png"/>

In our application, say that we sometimes want a table that looks just like the one we have above. But sometimes, we like to add a header to our components:

<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table-with-header.png"/>

And we like to add headers to all kinds of components - not just tables! We want these headers to all be consistent, too.

We could just tack an `<h3>` tag in wherever we need it, but that could potentially lead to inconsistencies, and if we wanted to change the `<h3>` to an `<h2>` or something like that, we'd need to hunt them down everywhere. Instead, we could compose a component that will render the table with an arbitrary header. 

```js
const mixinTitle = (InnerComponent) => {
  return (props) => {
    const { title  } = props;

      return (
        <div>
          <h3>{ title }</h3>
          <InnerComponent {...props} />
        </div>
      );
  }
}
```

Now look how easy our life is:

```js
const TableWithTitle = mixinTitle(Table);

ReactDOM.render(
  <TitleTable title="Dogs" rows={DOGS} headers={COL_HEADERS} />,
  document.getElementById('app')
);
```

What's great about this is that we can now add the same header to any component. All we need to do is compose it with the `mixinTitle` function and pass it the additional `title` prop:

```js
// consider this additional, simple component
const Greeting = (props) => {
  return <p>{ props.message }</p>
}

const TableWithTitle = mixinTitle(Table);
const ParagraphWithTitle = mixinTitle(Greeting);

ReactDOM.render(
  <div>
    <TitleTable title="Dogs" rows={DOGS} headers={COL_HEADERS} />
    <ParagraphWithTitle title="Greeting" message="Hello world" />
  </div>,
  document.getElementById('app')
);
```

<img src="https://learndotresources.s3.amazonaws.com/workshop/58135430b659df00039f518f/table%20and%20p.png"/>