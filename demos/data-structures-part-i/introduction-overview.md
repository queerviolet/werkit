**Abstract data types** and **data structures** are fundamental to general computer science, and are also a great way to better understand object-oriented programming (OOP).

## Abstract Data Type (ADT)

An ADT is a description of information, how that information is connected, and performable operations on the information. For example, a list is an ordered collection of elements, which you can add to or read from. A dictionary is a set of key-value pairs, where you can get or set a value (e.g. "Emily") by key (e.g. "name"). Notice that an ADT says nothing about programs, memory, steps, etc. — it's just a concept.

## Data Structure (DS)

A DS on the other hand is a *specific programmatic solution* for storing, referencing, and accessing data in computer memory. The purpose of a data structure is to implement some ADT — for example, to take the concept of a "list" and realize it in actual code (place such-and-such data at this memory address, increment a variable, etc.).

Often an ADT can be implemented via more than one DS. Since different DSs have advantages and disadvantages from functionality and performance standpoints, it is beneficial to have a solid understanding of how they work.

# What You'll Be Doing

This workshop will be broken into two parts. Through the course of the workshop, you will write JavaScript implementations of several ADTs/DSs: *queues*, *linked lists, * *hash tables* and *binary search trees*. In this first part, we will focus on implementing the *queue* ADT using an array DS. Afterward, we will implement our own *Linked List* DS, before a final culminating exercise where we reimplement our *queue*, except this time using our *Linked List* under the hood.

Along the way we will use object-oriented principles like inheritance.

Since JavaScript is a very high-level language with (almost) no *direct* memory management, some of our "implementations" will more accurately be "simulations" — but that's ok, we'll still be adhering to the spirit of the concept if not always the law.

<!--- Comment: Why are we discouraging Object.create ? -->
You should write your code using the `new` keyword instead of `Object.create`.