**This page is 100% theory (no actions required).**

To implement `ls`, we used the **asynchronous** function `fs.readdir`. There exists a simpler, **synchronous** version of that method, `fs.readdirSync`. Throughout this workshop, however, you will be required to use async methods. This is an artificial imposition since our bash.js UI does not significantly benefit from asynchronicity; however, we want you to practice using Node.js-style callbacks for control flow. Such practice will pay off very soon when we learn Express.js.

# Synchronous and Blocking

`fs.readdirSync` grinds our entire program to a halt; nothing else can occur during a `readdirSync`. Since disk access is very slow compared to normal program execution, this is a pointless waste if there is anything else we might want our application to do in the meantime. We would therefore say that `fs.readdirSync` is **blocking**.

Technically speaking, almost any normal statement in JavaScript is "blocking" in the sense that it must be executed before the next statement is performed. However, most JavaScript executes very quickly as the CPU manipulates registers, caches, and RAM. We only use the term *blocking* for something that not only prevents the JS thread from proceeding, but is also *slow*: disk reads, network requests, etc.

# Asynchronous and Non-Blocking

If all we had to work with was the single thread of the JavaScript runtime (V8), that would be the end of the story — slow actions would simply block our JS until completed. But V8 is only one piece of the puzzle, whether in Node or a web browser. Such *host environments* provide other *threads* that can handle work, while our JavaScript continues on its merry way. We can take advantage of those threads using host-provided **asynchronous** APIs. All asynchronous functions are just abstractions using these built-in APIs.

*Asynchronous* means that an action occurs out-of-step with our main JS program, in the "background". Asynchronous methods like `fs.readdir` are **non-blocking**. During a background disk read, our program could (in theory) perform other actions. (We will quietly ignore that bash.js doesn't specifically take advantage of that capability.)

# How Asynchronous Functions "Leave" and "Re-Enter" the JavaScript Thread

When an asynchronous background operation (such as reading a directory) has completed, the host environment (Node / the browser) needs some way to communicate this back to our JS thread. The solution is for the host environment to queue up a **callback function** which will execute as soon as the JS function call stack is empty. The second argument to to `fs.readdir` is a callback. You could say that `fs.readdir` "leaves" JS, and the callback given to `fs.readdir` "re-enters" (or *calls back*) JS.

Note that not all asynchronous methods are necessarily slow; a method might be asynchronous simply because it involves "leaving" the main JS thread. Doing a `setTimeout` with `0` delay, for example, queues up a callback to run as soon as the call stack is empty. Also, a Node program might interact with other programs, which can be fast but occurs "outside" of the JavaScript thread.

# Final Note

 | Non-Blocking | Blocking
---|---|---
Synchronous | `var x = 5`; manipulates memory (fast). Technically, JS does not proceed until this statement completes, but it completes too quickly to count as "blocking." | `fs.readdirSync`; accesses disk (slow) stopping JS in the meantime.
Asynchronous | `fs.readdir`; accesses disk (slow) but in background, letting JS proceed in the meantime. Or: `setTimeout` with a `0` delay; fast, but also in background, letting other JS proceed in the meantime. | N/A; by definition, an asynchronous function cannot block the JS thread.

Asynchronous functions are **extremely important** to understand. As you implement the upcoming commands, keep this in mind! You should watch this video in your off time to understand the ins and outs of asynchronous JavaScript.

<iframe width="100%" height="480px" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allowfullscreen></iframe>