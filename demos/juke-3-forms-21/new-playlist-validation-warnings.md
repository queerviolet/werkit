Let's show or hide descriptive warning messages when the field is invalid. For example, the following JSX is a warning message we might show if the user has not entered a playlist name:

```html
<div className="alert alert-warning">Please enter a name</div>
```
Make sure that we only show this error *after* they edit the field!

<guide>
A warning appears when the field has more than 16 characters
A warning appears when the field is emptied to have no characters in it
A warning does not appear when the field has not yet been used (i.e. when it's first loaded)
</guide>