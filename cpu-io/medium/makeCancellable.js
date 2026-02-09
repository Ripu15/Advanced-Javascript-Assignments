
// Problem Description – Abortable Promise Wrapper

// You are required to wrap a Promise so that it can be cancelled using an AbortSignal.
// If the signal is aborted before the Promise settles, the wrapper should immediately reject with an appropriate error. 
// If not aborted, it should resolve or reject normally.

function makeCancellable(promise, signal) {
  return new Promise((resolve, reject) => {
    
    const abortError = () => {
      const err = new Error("Aborted"); 
      err.name = "AbortError";
      return err;
    };

    //If already aborted
    if (signal.aborted) {
      reject(abortError());
      return;
    }

    //Abort handler
    const onAbort = () => {
      reject(abortError());
    };

    //Listen for abort
    signal.addEventListener("abort", onAbort, { once: true });

    //Attach original promise
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => {
        //Cleanup
        signal.removeEventListener("abort", onAbort);
      });
  });
}




module.exports = makeCancellable;
