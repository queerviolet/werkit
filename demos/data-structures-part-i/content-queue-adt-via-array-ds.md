The *Queue* ADT is a container for multiple elements. Those elements are *ordered* (i.e., they are arranged in a sequence) and may repeat (unlike a mathematical set). The main operations associated with a queue are as follows:

---

Operation | Action | Notes
--|--|--
`enqueue` | add a value to the queue | respects existing order, i.e. is placed "after" existing elements
`dequeue` | remove a value from the queue | **obeys FIFO** (first in, first out) and handles underflow (i.e. what to do when dequeueing an empty queue?)
`size` | reports number of items in the queue |

Queues occur frequently in programming, whenever new items are not immediately used but rather are destined to be consumed at a later time. For example, consider an office printer, which can hold more than one print job at a time, even while the current job is being printed.

### Solution 1: the Array DS

Since the Queue is an ADT, there are multiple possible DSs we could use to write it. But to begin, use a simple array.\*

To simulate some aspects of using a lower-level data structure than the actual JavaScript array, <strong style="color: DarkRed;">you may not use *any* Array.prototype methods (e.g. `push` / `pop` / `shift` / `unshift`), nor the `.length` property.</strong> Instead, use `head` and `tail` (or whatever you want to call those variables) indices that increment when functions like `enqueue` and `dequeue` are called. Indeed, the built-in methods actually perform similar "accounting" internally.

Go ahead and code out the Queue spec now.

<small>**Note: strictly speaking, JS arrays are not "true" arrays, but rather variations on the Object built-in data type, which is implemented in the V8 engine by both real arrays and hash tables on a dynamic basis. For the purposes of this workshop, we will ignore this inconvenient fact. In fact, Node Buffers and ES6 Typed Arrays do implement true arrays, but lie beyond the scope of this exercise.*</small>