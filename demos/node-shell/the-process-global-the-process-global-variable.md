When we run `node [filename]` in the terminal, we are instantiating a *process* on a computer. This is a process just like the one running your Chrome window and the list of processes you can see in **Activity Monitor** tool on OSX or **Task Manager** on Windows. Meta-information about this process accessible to you by using the `process` global in a Node program.

Try it out: in our `bash.js`, let's `console.log` out the variable named `process`. This variable is a *global* variable, meaning it's available anywhere in our Node program and does not have to be instantiated. Scan through the different properties and even try logging `Object.keys(process)` to see a list of all proprties.

---

### Side Note

A program is the set of instructions necessary to run a *process*. Processes comprise one or more *threads* — series of execution steps that the Operating System (OS) can tell the CPU to perform.

A single-threaded CPU core can only do one step at a time. To simulate processes running simultaneously, the computer actually jumps between threads very quickly. The OS *schedules* these jumps via a fair algorithm.

Even better, modern CPUs often have multiple *logic cores*, usually two or four. They therefore can execute multiple threads truly simultaneously — "multi-threading". Amazingly, cores themselves can be "hyper-threaded", able to handle two threads each. Writing code to coordinate many threads (parallelization) is a challenge, however. Examples of parallel tasks include video encoding (multiple parts of the video can be encoded simultaneously) or sending many emails.

JavaScript is single-threaded. Some asynchronous APIs such as [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) let you spawn new threads. But the language itself only accounts for one.