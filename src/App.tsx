import React from 'react';
import styles from './App.module.scss';

const handleDebounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const handleThrottle = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) return;
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
};

const App = () => {
  const handleDebounceClick = React.useCallback(
    handleDebounce((e) => {
      console.log('防抖');
      console.log(e);
    }, 500),
    [],
  );

  const handleThrottleClick = React.useCallback(
    handleThrottle((e) => {
      console.log('节流');
      console.log(e);
    }, 500),
    [],
  );

  React.useEffect(() => {
    function deepClone(target) {
      if (typeof target !== 'object' || target === null) {
        return target;
      }
      const res = Array.isArray(target) ? [] : {};
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          res[key] = deepClone(target[key]);
        }
      }
      return res;
    }
    const a = { name: { name: 'a' } };
    const b = deepClone(a);
    console.log(a);
    console.log(b);
    console.log(a === b);
    console.log(a.name === b.name);
    const c = [1, 2, 3].reduce((number, res) => {
      res.unshift(number);
    }, []);
    console.log(c);
  }, []);

  return (
    <div className={styles.test}>
      <button onClick={handleDebounceClick}>防抖</button>
      <button onClick={handleThrottleClick}>节流</button>
    </div>
  );
};

export default App;
