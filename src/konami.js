// konami.js (C) 2018 Charles Stover
// www.charlesstover.com
// up, up, down, down, left, right, left, right, B, A, Start

const EVENT_LISTENER_OPTIONS = {
  passive: true
};

const KONAMI_CODE = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ];
const KONAMI_CODE_LENGTH = KONAMI_CODE.length;

const entered = [];

const events = new Map();

let lastId = 0;

const add = (f) => {
  lastId++;
  const id = lastId.toString();
  events.set(id, f);
  if (events.size === 1) {
    window.addEventListener('keydown', onWindowKeyDown, EVENT_LISTENER_OPTIONS);
  }
  return id;
};

const isValid = () => {

  // For each character in the Konami code,
  const enteredLength = entered.length;
  for (let x = 0; x < KONAMI_CODE_LENGTH; x++) {

    // If they haven't even entered this many characters, then they can't have entered the full code.
    if (enteredLength <= x) {
      return false;
    }

    /*
    If this character in the Konami code does not match, remove all entries up to this point.
    "up, up, down, down, left, up" becomes just "up" as the user attempts to start the code over.
    "up, up, down, down, left, D" becomes nothing as the user is no longer entering the Konami code.
    */
    if (entered[x] !== KONAMI_CODE[x]) {
      entered.splice(
        0,
        entered.length -
        (
          entered[x] === KONAMI_CODE[0] ?
            1 :
            0
        )
      );
      return false;
    }
  }

  // If we haven't returned an error yet, then the code was accurate in its entirety. Reset and validate it.
  entered.splice(0, entered.length);
  return true;
};

const onWindowKeyDown = ({ keyCode }) => {

  // Log the key press.
  entered.push(keyCode);

  // If the last entered keys equate to the Konami code,
  if (isValid()) {

    // Execute each function in the queue.
    for (const [ id, event ] of events) {
      event(() => {
        remove(id);
      });
    }
  }
};

const remove = (id) => {
  if (!events.has(id)) {
    return false;
  }
  events.delete(id);
  if (events.size === 0) {
    window.removeEventListener('keydown', onWindowKeyDown, EVENT_LISTENER_OPTIONS);
  }
  return true;
};

const methods = Object.assign(
  Object.create(null),
  { add, remove }
);

const Konami = Object.assign(
  Object.create(null),
  methods,
  { default: methods }
);

module.exports = Konami;
