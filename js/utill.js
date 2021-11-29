const debounce = (func, delay) => {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...args), delay);
  };
};
