// konami.js (C) 2018 Charles Stover
// www.charlesstover.com

const EVENT_LISTENER_OPTIONS = {
  passive: true
};

// up, up, down, down, left, right, left, right, B, A, Start
const KONAMI_CODE = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ];

export class Konami {

  constructor(...args) {
    this.code =
      Array.isArray(args[0]) ?
        args[0] :
        KONAMI_CODE;
    this.entered = [];
    this.events = new Map();
    this.lastId = 0;
    this.windowKeyDownHandler = this.windowKeyDownHandler.bind(this);
  }

  add(f) {
    this.lastId++;
    const id = this.lastId.toString();
    this.events.set(id, f);
    if (this.events.size === 1) {
      window.addEventListener('keydown', this.windowKeyDownHandler, EVENT_LISTENER_OPTIONS);
    }
    return id;
  }

  get isValid() {

    // For each character in the Konami code,
    const codeLength = this.code.length;
    const enteredLength = this.entered.length;
    for (let x = 0; x < codeLength; x++) {

      // If they haven't even entered this many characters, then they can't have entered the full code.
      if (enteredLength <= x) {
        return false;
      }

      /*
      If this character in the Konami code does not match, remove all entries up to this point.
      "up, up, down, down, left, up" becomes just "up" as the user attempts to start the code over.
      "up, up, down, down, left, D" becomes nothing as the user is no longer entering the Konami code.
      */
      if (this.entered[x] !== this.code[x]) {
        this.entered.splice(
          0,
          this.entered.length -
          (
            this.entered[x] === this.code[0] ?
              1 :
              0
          )
        );
        return false;
      }
    }

    // If we haven't returned an error yet, then the code was accurate in its entirety. Reset and validate it.
    this.entered.splice(0, this.entered.length);
    return true;
  }

  remove(id) {
    if (!this.events.has(id)) {
      return false;
    }
    this.events.delete(id);
    if (this.events.size === 0) {
      window.removeEventListener('keydown', this.windowKeyDownHandler, EVENT_LISTENER_OPTIONS);
    }
    return true;
  }

  windowKeyDownHandler({ keyCode }) {

    // Log the key press.
    this.entered.push(keyCode);
  
    // If the last entered keys equate to the Konami code,
    if (this.isValid) {
      console.log('Konami Code Activated');
  
      // Execute each function in the queue.
      for (const [ id, event ] of this.events) {
        event(() => {
          this.remove(id);
        });
      }
    }
  }
};

export default new Konami();
