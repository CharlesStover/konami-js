# konami.js
Konami.js is a JavaScript object that allows web developers to implement the Konami code on their webpages. By pressing up, up, down, down, left, right, left, right, B, A, Enter, one or more custom JavaScript functions will execute.

## Methods

### addEvent(function e)
Queues a function to be executed when the Konami code is entered by the user.

Returns an integer ID of the event, which can be used with removeEvent to disable the associated function from executing in future uses of the Konami code.

#### Parameters
* _function e_ - The function to be executed when the Konami code is entered by the user. The function's ID is passed as a parameter to it.

### removeEvent(int id)
The function associated with the ID will no longer execute when the Konami code is entered.

Returns the ID of the removed event.

#### Parameters
* _int id_ - The ID of the event to remove.

## Use
To use this script, add the following script to the end of your document, just before `</body>`:

```JS
<script src="//www.charlesstover.com/konami.js" type="text/javascript"></script>
```

Attach a function to execute when the Konami code is pressed by calling `konami.addEvent`:

```JS
window.addEventListener(
  "load",
  function() {
    konami.addEvent(
      function(id) {
        konami.removeEvent(id);
        document.getElementsByTagName("main").item(0).setAttribute("id", "konami");
      }
    );
  }
);
```

In this example, `addEvent` is called after the window has loaded to ensure that `konami.js` has also loaded. Executing `addEvent` after the `konami.js` script tag can alleviate the need for this. When the Konami code is entered, the function is removed from the queue (so that it doesn't trigger the next time the user enters the Konami code on the page), and then the first `<main>` element's ID is changed to `konami`. While simply changing an ID attribute does not alter the look of the page in and of itself, a `konami` ID can be used to trigger a CSS3 animation that causes the `<main>` element to animate.
