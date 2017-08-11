export default () => 
<Workshop name="Node Shell" description="Bash-ception: write a functioning shell prompt, in which Unix-like commands interact with a Node.js process to produce output which can be piped into further commands."
  artwork={ require('./1457364523445.jpg') }>
  <Concept name="Introduction">
    <Action name="Pre-Reading">
      { require('./introduction-pre-reading.md') }
    </Action>
    <Action name="The Unix Philosophy">
      { require('./introduction-the-unix-philosophy.md') }
    </Action>
    <Action name="Intro to node-shell">
      { require('./introduction-intro-to-node-shell.md') }
    </Action>
    <Action name="Introduction to Node">
      { require('./introduction-introduction-to-node.md') }
    </Action>
    <Action name="Setup">
      { require('./introduction-setup.md') }
    </Action>
  </Concept>
  <Concept name="The Process Global">
    <Action name="Simulating The Bash Shell">
      { require('./the-process-global-simulating-the-bash-shell.md') }
    </Action>
    <Action name="The 'process' global variable">
      { require('./the-process-global-the-process-global-variable.md') }
    </Action>
    <Action name="Stream communication">
      { require('./the-process-global-stream-communication.md') }
    </Action>
    <Action name="`pwd` and `date`">
      { require('./the-process-global-pwd-and-date.md') }
    </Action>
    <Action name="Prompt: How STDIN/STDOUT work in bash?">
      { require('./the-process-global-prompt-how-stdinstdout-work-in-bash.md') }
    </Action>
    <Action name="Streamline with nodemon">
      { require('./the-process-global-streamline-with-nodemon.md') }
    </Action>
  </Concept>
  <Concept name="Modules">
    <Action name="Separating commands into a separate file">
      { require('./modules-separating-commands-into-a-separate-file.md') }
    </Action>
    <Action name="Creating a module">
      { require('./modules-creating-a-module.md') }
    </Action>
    <Action name="Built-in modules and `ls`">
      { require('./modules-built-in-modules-and-ls.md') }
    </Action>
    <Action name="A note on callbacks">
      { require('./modules-a-note-on-callbacks.md') }
    </Action>
    <Action name="Prompt: Do you queue?">
      { require('./modules-prompt-do-you-queue.md') }
    </Action>
  </Concept>
  <Concept name="Command Arguments">
    <Action name="Taking arguments: `echo`">
      { require('./command-arguments-taking-arguments-echo.md') }
    </Action>
    <Action name="`cat`, `head`, and `tail`">
      { require('./command-arguments-cat-head-and-tail.md') }
    </Action>
    <Action name="Other useful commands">
      { require('./command-arguments-other-useful-commands.md') }
    </Action>
  </Concept>
  <Concept name="NPM Modules">
    <Action name="Implementing curl">
      { require('./npm-modules-implementing-curl.md') }
    </Action>
    <Action name="Third-party modules">
      { require('./npm-modules-third-party-modules.md') }
    </Action>
    <Action name="npm install request">
      { require('./npm-modules-npm-install-request.md') }
    </Action>
    <Action name="Curl redux">
      { require('./npm-modules-curl-redux.md') }
    </Action>
  </Concept>
  <Concept name="Handling Asynchronicity">
    <Action name="Remove repeated work">
      { require('./handling-asynchronicity-remove-repeated-work.md') }
    </Action>
    <Action name="Extra Credit: The find command">
      { require('./handling-asynchronicity-extra-credit-the-find-command.md') }
    </Action>
  </Concept>
  <Concept name="Piping Data">
    <Action name="UNIX Pipes">
      { require('./piping-data-unix-pipes.md') }
    </Action>
    <Action name="Implementing Piping">
      { require('./piping-data-implementing-piping.md') }
    </Action>
    <Action name="grep matchString">
      { require('./piping-data-grep-matchstring.md') }
    </Action>
  </Concept>
  <Concept name="Conclusion">
    <Action name="Epilogue">
      { require('./conclusion-epilogue.md') }
    </Action>
  </Concept>
</Workshop>