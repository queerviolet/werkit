A **Linked List** is a data structure, meaning a concrete programmatic way of managing information in memory. They can be used to implement a number of ADTs, including Queues, Stacks, Lists, and others.

Linked Lists are collections of *nodes* — wrapper structures which encapsulate a `value` and one or more *pointers* (references) to other nodes. The Linked List instance typically only has a reference to a so-called *handle* node, e.g. the `head` (first node) — it has no direct knowledge of other nodes in the list. However, the handle then points to a `next` node, which itself points to another `next` node, and so on and so forth. A list ends when a node's `next` pointer is `null` or `undefined`. The act of starting from a handle and visiting nodes in sequence is known as "traversing" a linked list.

Below is a description of a singly-linked list with a `head` handle and three nodes total:

```txt
Head reference -> Node A
Node A has value 56 and pointer next -> Node B
Node B has value 33 and pointer next -> Node C
Node C has value 12 and pointer next -> null
```

<pre style="font-family: 'Courier New'">
HEAD  ────────┐                                                  ┌───────── TAIL
              │                                                  │
              │                                                  │
              ▼                                                  ▼
     ┌────────┬───────┐       ┌────────┬───────┐        ┌────────┬───────┐
     │        │       │       │        │       │        │        │       │
     │   56   │   ────┼─────> │   33   │   ────┼──────> │   12   │   ────┼─────>
     │        │       │       │        │       │        │        │       │
     └────────┴───────┘       └────────┴───────┘        └────────┴───────┘</pre>

Linked Lists can come in various flavors. For example, in doubly-linked lists, each node might point both to the `next` node and to the `previous` node as well. In some variations, the parent Linked List instance might maintain both `head` *and* `tail` references. For this workshop, follow the (opinionated) spec to implement a doubly-linked list with both handles.

<small>*Side note: in JavaScript, an object is maintained in memory so long as there exist references to it. Once an object has no references pointing to it, automatic garbage collection will eventually free that memory so that the program can use it for other variables (it does not matter if the object itself has references to other variables). So the only real way to "delete" an object in JS to remove all references to it.*</small>

<hint title='Adding a node'>
```js
LinkedList.prototype.addToTail = function(val) {
  var newNode = new Node(val, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};
```
</hint>