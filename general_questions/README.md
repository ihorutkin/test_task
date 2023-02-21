# General questions

1. How do Promises work?
2. What kind of scopes are in Javascript? What are the differences between them? 
3. What is type coercion and when is it used?
4. Explain the difference between passing argument as a value and as a reference.
5. What are the local storage, session storage and cookies used for?
6. What are the key differences between regular and arrow functions?
7. When would you use destructuring assignment?
8. What is optional chaining useful for?
9. Explain why following code does not work as one would expect it to. How would you fix it?
```js
class IdGenerator {
  lastId = 0;
  getId() {
    return this.lastId++;
  }
}
const { getId } = new IdGenerator();
const people = ["Tom", "Kate", "Taylor"].map(name => ({name, id: getId()}));
```
10. Explain the difference:
```ts
const a: string = "hello";
const a = "hello" as string;
```




# Answers

1. "Promise" it is special object which has "creating" and "executing" code. It is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

A Promise is in one of these states:

pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation was completed successfully.
rejected: meaning that the operation failed.

The eventual state of a pending promise can either be fulfilled with a value or rejected with a reason (error). When either of these options occur, the associated handlers queued up by a promise's then method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

2.  1. Global scope

    Global scope it is highest scope in the program, it is default scope when we create the project.
    Variables in global scope are available in other blocks, functions, inner scopes etc.

    2. Block scope (only for let and const, var doesn`t have block scope)

    Block scope has if, for and while

    Example: 

    ```js 

    if(/*Conditions*/){
      let str = 'Hellow world'
      console.log(str)           // Hellow world
    }
    cosnole.log()                // ReferenceError

    ```

    3. Function scope

    Every variables have function scope

    Example:

    ```js

    function arr(){
      let arr = [1, 2, 3, 4, 5]
      console.log(arr)
    }
    arr()                         // [1, 2, 3, 4, 5]
    console.log(arr)              // ReferenceError

    ```

    4. Module scope

    Example: 

    ```js 

    /*We have module 'number'*/

    const num = 10                // declaration of variable, we can`t see this variables in othe scopes befor exports
    console.log(num)

    /*Other module 'string'*/

    import num from './number'

    console.log(num)              // ReferenceError

    ```

    5. Leksical scope

    ```js 

    function outer() {
    // outer() scope
    let v = 'outer() scope!'

        function inner() {
            // inner() scope
            console.log(v) // 'outer() scope!'
        }

        return inner
    }

    const f = outer()
    f()

    ```

3. There are 4 types of coercions: Number, String, Logic and object. 
  1. Number coercion
  Features of Numbers coercion:
      nudefined  -> NaN
      Null       -> 0
      true/false -> 1/0
      If we have string (if we have gap from the each sides we must eliminate this), we need to read only number value for example 
      "    123      " -> 123, but if we have "123v" -> NaN
  2. String coercion
  When we need string form of a value we have to use a string coercion
  String coercion is simple, we need just write primitive value in function String() or we can use alert()
  3. Logic coercion is simplest of them
  Features of Logic coercion:
      0, null, undefined, "" (not " " - it is not empty string) and NaN will be false
      rest will be true

4. When we are passing some arguments as a value, we are working only with copy of variable, it mean that we can get old value of this variable 
after calling a function

Example: 

```js

function num(x){
  x = x + 2
  console.log(x)
}

let a = 1

console.log(a)                        // a = 1
num(a)                                // a = 3
console.log(a)                        // a = 1

```

But if we ara passing arguments as a reference, we are changing original value

Example: 

```js

function obj(user){
  user.name = 'John'
}

let person = {
  name: 'Tom'
}

console.log(person.name)               // 'Tom'
obj(person)
console.log(person.name)               // 'John'

```

But if we will try change object completely it will not work

Example: 

```js

function obj(user){
  user = {
    name: 'John'
  }
}

let person = {
  name: 'Tom'
}

obj(person)
console.log(person.name)                // 'Tom'

```

It works with objects and with arrays in a similar way

5. We need to use local storage and session storage to save information like pairs "key" and "value", and these two arguments must be string.
The limit is 5mb+, depends on the browser. They do not expire. The data is bound to the origin (domain/port/protocol).
Some differences between local and session storage

Local storage
Shared between all tabs and windows with the same origin
Survives browser restart

Session storage
Visible within a browser tab, including iframes from the same origin
Survives page refresh (but not tab close)

Cookies are small strings of data that are stored directly in the browser. They are part of the HTTP protocol
One of the most widespread use cases is authentication:
Upon sign in, the server uses the Set-Cookie HTTP-header in the response to set a cookie with a unique “session identifier”.
Next time when the request is sent to the same domain, the browser sends the cookie over the net using the Cookie HTTP-header.
So the server knows who made the request.

6. Arrow functions doesn`t have own 'this' and arrow functions we can not call before initialization

7. The two most used data structures in JavaScript are Object and Array. Objects allow us to create a single entity that stores data items by key.
Arrays allow us to gather data items into an ordered list. Although, when we pass those to a function, it may need not be an object/array as a whole. It may need individual pieces. In this case we will use destructuring assignment.

8. The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist. The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

9. A class method cannot exist without its own object. getId doen`t have his this after destruction

```js

function idGenerator(){
  let lastId = 0
  return () => lastId++
}

```

10. 

# First one

First one it is when variable a is string type. 

Type annotations are used to tell the compiler that a variable through its lifetime can only have a specified type. When someone will try to assign a type that is incompatible, an error will be thrown

# Second one

Second one it is when you say to compilator: "Understand variable a as a string"

Type assertions are used to cast variables to a specific type. When you use it you tell the compiler that you know better what type the variable has and he does not need to guess it

# Difference

The primary difference between type annotation and type assertion is that type assertion weakens the type checking feature of Typescript. While using type annotation you make a code resilient to runtime errors, but type assertions don’t enforce that.