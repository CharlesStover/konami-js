require('./mutate-window')(window);
const Konami = require('../konami');

describe('@gamingmedley/konami.js', () => {
  let eventListener = null;
  let success = false;

  it('should start with no event listeners', () => {
    if (window.onKeyDownListeners.length > 0) {
      throw new Error('listeners exist');
    }
  });

  it('should add event listeners', () => {
    eventListener = Konami.add(() => {});
    if (window.onKeyDownListeners.length !== 1) {
      throw new Error('more/less than 1 listeners exist');
    }
  });

  it('should remove event listeners', () => {
    if (Konami.remove(eventListener) === false) {
      throw new Error('did not remove event listener');
    }
    if (window.onKeyDownListeners.length > 0) {
      throw new Error('listeners exist');
    }
  });

  it('should only remove existent event listeners', () => {
    if (Konami.remove('0') === true) {
      throw new Error('removed non-existent event listener');
    }
  });

  it('should add multiple event listeners', () => {
    Konami.add(() => {});
    Konami.add(() => {});
    if (window.onKeyDownListeners.length !== 1) {
      throw new Error('more/less than 1 listeners exist');
    }
  });

  it('should respond to the Konami code', () => {
    Konami.add(() => {
      success = true;
    });
    const KONAMI_CODE = [ 1, 1, 1, 1, 1, 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13, 1, 1, 1, 1, 1 ];
    for (let x = 0; x < KONAMI_CODE.length; x++) {
      window.onKeyDown(KONAMI_CODE[x]);
    }
    if (success !== true) {
      throw new Error('did not execute event listeners');
    }
  });
});
