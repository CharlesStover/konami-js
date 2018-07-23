# Konami.js
Konami.js is a JavaScript package that allows web developers to implement an event listener for the Konami code on their web pages. By pressing up, up, down, down, left, right, left, right, B, A, Enter, one or more custom JavaScript functions will execute.

## Examples

### CommonJS/ES5

#### Adding an Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.js"></script>
<script type="text/javascript">
Konami.add(function() {
  alert('This will alert every time the Konami code is entered.');
});
</script>
```

#### Adding a Single-Execution Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.js"></script>
<script type="text/javascript">
Konami.add(function(unsubscribe) {
  unsubscribe(); // Unsubscribes the listener from future Konami code entries.
  alert('This will only alert the first time the Konami code is entered.');
});
</script>
```

#### Removing an Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.js"></script>
<script type="text/javascript">
var id = Konami.add(function() {
  alert('This will not alert, because it will have been removed.');
});
Konami.remove(id);
</script>
```

### ES6

#### Adding an Event Listener
```JS
import Konami from '@gamingmedley/konami.js';
Konami.add(() => {
  alert('This will alert every time the Konami code is entered.');
});
```

#### Adding a Single-Execution Event Listener
```JS
import Konami from '@gamingmedley/konami.js';
Konami.add((unsubscribe) => {
  unsubscribe(); // Unsubscribes the listener from future Konami code entries.
  alert('This will only alert the first time the Konami code is entered.');
});
```

#### Removing an Event Listener
```JS
import Konami from '@gamingmedley/konami.js';
const id = Konami.add(() => {
  alert('This will not alert, because it will have been removed.');
});
Konami.remove(id);
```

## Methods

* ### add
  Queues a function to be executed when the Konami code is entered by the user.

  Returns a unique ID of the event, which can be used with `remove` to disable the associated function from executing in future uses of the Konami code.

  #### Parameters
  * `function e`: The function to be executed when the Konami code is entered by the user. An unsubscribe function is passed as a parameter to it.

* ### remove
  The function associated with the ID will no longer execute when the Konami code is entered.

  Returns `true` on success, `false` on failure.

  #### Parameters
  * `string id`: The ID of the event to remove.
