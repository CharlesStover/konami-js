const Konami = require('../konami');

describe('@gamingmedley/konami.js', () => {
  let eventListener = null;

  it('should add event listeners', () => {
    eventListener = Konami.add(() => {});
  });

  it('should remove event listeners', () => {
    if (Konami.remove(eventListener) === false) {
      throw new Error('did not remove event listener');
    }
  });

  it('should only remove existent event listeners', () => {
    if (Konami.remove('0') === true) {
      throw new Error('removed non-existent event listener');
    }
  });
});
