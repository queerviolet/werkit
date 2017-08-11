export default () => 
<Workshop name="Data Structures Part I" description="Implement, simulate, and explore Abstract Data Types and Data Structures, including Queues, Linked Lists, Hash Tables and Binary Search Trees."
  artwork={ require('./1457364781817.jpg') }>
  <Concept name="Introduction">
    <Action name="Overview">
      { require('./introduction-overview.md') }
    </Action>
    <Action name="Pre-Reading">
      { require('./introduction-pre-reading.md') }
    </Action>
    <Action name="Setup">
      { require('./introduction-setup.md') }
    </Action>
    <Action name="Instructor Notes">
      { require('./introduction-instructor-notes.md') }
    </Action>
  </Concept>
  <Concept name="Content">
    <Action name="Queue ADT via Array DS">
      { require('./content-queue-adt-via-array-ds.md') }
    </Action>
    <Action name="Linked List DS">
      { require('./content-linked-list-ds.md') }
    </Action>
    <Action name="Queue ADT via LL DS">
      { require('./content-queue-adt-via-ll-ds.md') }
    </Action>
  </Concept>
  <Concept name="Extra Credit">
    <Action name="Circular Buffers with Typed Arrays">
      { require('./extra-credit-circular-buffers-with-typed-arrays.md') }
    </Action>
  </Concept>
</Workshop>