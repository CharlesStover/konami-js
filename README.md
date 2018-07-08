# Konami.js
Konami.js is an ES6 JavaScript instance that allows web developers to implement the Konami code on their web pages. By pressing up, up, down, down, left, right, left, right, B, A, Enter, one or more custom JavaScript functions will execute.

## Examples

### CommonJS/ES5

#### Adding an Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.min.js"></script>
<script type="text/javascript">
var konami = new Konami();
konami.add(function() {
  alert('This will alert every time the Konami code is entered.');
});
</script>
```

#### Adding a Single-Execution Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.min.js"></script>
<script type="text/javascript">
var konami = new Konami();
konami.add(function(unsubscribe) {
  unsubscribe(); // Unsubscribes the listener from future Konami code entries.
  alert('This will only alert the first time the Konami code is entered.');
});
</script>
```

#### Removing an Event Listener
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.min.js"></script>
<script type="text/javascript">
var konami = new Konami();
var id = konami.add(function() {
  alert('This will not alert, because it will have been removed.');
});
konami.remove(id);
</script>
```

#### Using Custom Keys
```JS
<script type="text/javascript" src="https://gamingmedley.com/konami.min.js"></script>
<script type="text/javascript">
var konami = new Konami([ 37, 38, 39, 40 ]); // key codes for left, up, right, down
konami.add(function() {
  alert('This will alert every time the user enters left, up, right, down.');
});
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

#### Using Custom Keys
```JS
import { Konami } from '@gamingmedley/konami.js'; // Import the class instead of the instance.
const konami = new Konami([ 37, 38, 39, 40 ]); // key codes for left, up, right, down
konami.add(() => {
  alert('This will alert every time the user enters left, up, right, down.');
});
</script>
```

## Methods

### constructor(number[] keyCodes?)

#### Parameters
* `number[] keyCodes`: If this array of key codes is not provided (or you use the default export), it will default to the Konami code (`[ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ]` for up, up, down, down, left, right, left, right, B, A, Enter). If an array is provided, _you may mutate it_, and the key listener will update accordingly.

### add(function e)
Queues a function to be executed when the Konami code is entered by the user.

Returns a unique ID of the event, which can be used with `remove` to disable the associated function from executing in future uses of the Konami code.

#### Parameters
* `function e`: The function to be executed when the Konami code is entered by the user. An unsubscribe function is passed as a parameter to it.

### remove(string id)
The function associated with the ID will no longer execute when the Konami code is entered.

Returns `true` on success, `false` on failure.

#### Parameters
* `string id`: The ID of the event to remove.
