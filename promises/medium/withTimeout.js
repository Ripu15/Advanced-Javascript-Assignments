// Problem Description – withTimeout(promise, ms)

// You are required to create a wrapper function named withTimeout that takes a Promise and a time limit in milliseconds. 
// The function should return a new Promise that settles with the same result as the original Promise if it completes within the given time. 
// If the Promise does not settle within the time limit, it should reject with the message "Timeout".

//Promises cannot be cancelled — only their effects can be ignored.
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const timerId = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Timeout")); 
      }
    }, ms);

    promise
      .then((value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timerId);
          resolve(value);
        }
      })
      .catch((err) => {
        if (!settled) {
          settled = true;
          clearTimeout(timerId);
          reject(err);
        }
      });
  });
}



module.exports = withTimeout;

