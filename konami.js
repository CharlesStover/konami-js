// konami.js (C) 2016-2018 Charles Stover
// www.charlesstover.com
// up, up, down, down, left, right, left, right, B, A, Start
var konami = {

  // Add a function to the queue to execute once the Konami code has been entered.
  addEvent: function(f) {
    this.events.push(f);
    return this.events.length - 1;
  },

  // Check to see if the user's string of keys matches the Konami code.
  check: function() {

    // For each character in the Konami code,
    var codeLength = this.code.length;
    var enteredLength = this.entered.length;
    for (var x = 0; x < codeLength; x++) {

      // If they haven't even entered this many characters, then they can't have entered the full code.
      if (enteredLength <= x) {
        return false;
      }

      /*
      If this character in the Konami code does not match, remove all entries up to this point.
      "up, up, down, down, left, up" becomes just "up" as the user attempts to start the code over.
      "up, up, down, down, left, D" becomes nothing as the user is no longer entering the Konami code.
      */
      if (this.entered[x] != this.code[x]) {
        this.entered =
          this.entered[x] == this.code[0] ?
            [ this.code[0] ] :
            [];
        return false;
      }
    }

    // If we haven't returned an error yet, then the code was accurate in its entirety. Reset and validate it.
    this.entered = [];
    return true;
  },

  // the Konami code itself
  code: [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ],

  // the last keys entered by the user
  entered: [],

  // Queue of functions (set by addEvent) to execute once the Konami code has been entered.
  events: [],

  // Event listener for the Konami code key presses.
  onWindowKeyDown: function(e) {

    // Log the key press.
    this.entered.push(e.keyCode);
  
    // If the last entered keys equate to the Konami code,
    if (this.check()) {
      console.log('Konami Code Activated');
  
      // Execute each function in the queue.
      var eventsLength = this.events.length;
      for (var x = 0; x < eventsLength; x++) {
        if (typeof this.events[x] === 'function') {
          this.events[x](x);
        }
      }
    }
  },

  // Remove a function from the queue.
  removeEvent: function(i) {
    this.events[i] = null;
    return true;
  }
};

konami.onWindowKeyDown = konami.onWindowKeyDown.bind(konami);

// Bind the event listener.
window.addEventListener('keydown', konami.onWindowKeyDown);
