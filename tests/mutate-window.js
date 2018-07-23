module.exports = (window) => {
  window.onKeyDownListeners = [];

  window.addEventListener = (event, listener) => {
    window.onKeyDownListeners.push(listener);
  };

  window.onKeyDown = (keyCode) => {
    for (const listener of window.onKeyDownListeners) {
      listener({ keyCode });
    }
  };

  window.removeEventListener = (event, listener) => {
    window.onKeyDownListeners.pop();
  };
};
