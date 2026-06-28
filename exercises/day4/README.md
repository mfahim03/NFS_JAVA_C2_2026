```text
What is one difference between a Java object and a JavaScript object?
```
One difference between a Java object and a JavaScript object is that a Java object is usually created from a class with defined fields and types, while a JavaScript object can be created directly using an object literal with `{}`.

```text
How is a JavaScript array similar to Java ArrayList?
```
Both a JavaScript array and a Java ArrayList can store multiple values and allow to loop through the items one by one.

```text
Why are arrow functions important before learning React?
```
Arrow functions are important before learning React because React code often uses them for event handlers, callbacks, array methods, and small component helper functions.

```text
1. What is the difference between filter, find, and map?
2. Which four array methods change the original array?
3. What does push return?
4. What does pop return?
5. What is the difference between shift and unshift?
```
1. `filter` returns a new array of all matching items, `find` returns the first matching item, and `map` returns a new array with transformed values.
2. `push`, `pop`, `shift`, and `unshift` change the original array.
3. `push` returns the new length of the array.
4. `pop` returns the item removed from the end of the array.
5. `shift` removes the first item from the array, while `unshift` adds a new item to the beginning of the array.

```text
What does the DOM allow JavaScript to do?
```
The DOM allows JavaScript to read, change, create, and remove HTML elements on a web page while the page is running in the browser.

```text
How is JavaScript filter used in a search feature?
```
JavaScript `filter` is used in a search feature by checking each item against the search keyword and returning a new array that contains only the matching results.

```text
1. What does async mean?
2. What does await do?
3. What does fetch do?
4. Why do we use fetch before connecting to a real backend API?
5. Why should this exercise be run using Live Server?
```
1. `async` means a function can contain code that waits for a task to finish, such as loading data.
2. `await` pauses the async function until the promise finishes and returns its result.
3. `fetch` requests data from a file or an API.
4. We use `fetch` before connecting to a real backend API because it teaches the same request and response flow with a simple local JSON file first.
5. This exercise should be run using Live Server because browsers may block `fetch("students.json")` when the HTML file is opened directly from the file system.
