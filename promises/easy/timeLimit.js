// Problem Description – Time-Limited Async Function

// You are given an asynchronous function and a time limit t in milliseconds.
// Your task is to wrap this function so that it either resolves normally if it completes within the given time or rejects 
// with the message "Time Limit Exceeded" if execution takes longer than t.


//'fn' is asyc function
//'t' is time-limit
function timeLimit(fn, t) {
// create a wrapper so that:
// if 'fn' finishes before t → return its result
// if 'fn' takes longer than t → reject with
// "Time Limit Exceeded"

// Start two things at the same time
// and accept the one that finishes first.
//Those two things are:
// The original async function
// A timeout that fails after t ms

  return function (...args) {
// the wrapped function must return a Promise Because:
// original fn is async
// timeout is async
// So we return a Promise:
    return new Promise((resolve, reject) => {

      // Timer to reject if time exceeds t
      const timerId = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);

      // Execute the original async function
      Promise.resolve(fn(...args))
        .then(result => {
          clearTimeout(timerId); // stop timeout
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timerId); // stop timeout
          reject(error);
        });
    });
  };
}

module.exports = timeLimit;

