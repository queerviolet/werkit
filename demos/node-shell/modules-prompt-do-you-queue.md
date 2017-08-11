What do you think the output is when you run this code:

``` javascript
var startTime = new Date;

setTimeout(function () {
  var endTime = new Date;
  console.log('Time elapsed: ', endTime - startTime, 'ms');
}, 500);

while (new Date - startTime < 1000) {};

```

Pay special attention to the `while` loop, while it doesn't do anything, it occupies the single thread of JavaScript so that nothing else can happen. It is only once the call stack is empty (JS has nothing left to do) that the timeout handler is allowed to be placed on the stack and then executed. Understanding why this code outputs the things it does is a big part of understanding how JavaScript deals with asynchronicity.