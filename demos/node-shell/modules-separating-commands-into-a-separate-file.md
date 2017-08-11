Thus far, we've implemented two commands: `pwd` and `date`. A good start, but we have many to go! It may get a bit unruly if we put all the logic for all of our commands squashed into our `bash.js` file alongside logic for parsing the original command string, so let's plan for the future and put our command functions into a separate file, `commands.js`.  That file will then `export` an object with the functions that represent each of our different commands.

<pre>
+--------------+       +------------+            
|              |       |            |            
|  commands.js +---+--->  bash.js   |            
|              |   ^   |            |            
+--------------+   |   +------------+            
                   +                             
                The module commands.js can export
                information to the bash.js file  

</pre>