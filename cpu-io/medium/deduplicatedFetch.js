// Problem Description – Deduplicated Network Request Utility
// You are required to build a utility that prevents multiple identical network requests from executing simultaneously. 
// If the same request (for example, getData('id-1')) is called multiple times at the same moment, only one network request should be triggered. 
// All callers must receive the same Promise result once the request completes.

//'Map' is used for fast lookup
const pendingRequests = new Map();

function deduplicatedFetch(id, apiCall) {
     // If request already in progress, return same Promise
  if (pendingRequests.has(id)) {
    return pendingRequests.get(id);
  }
   // Create the network request, if 'pendingRequests'
   //does not have the 'id'
  const promise = Promise.resolve()
    .then(() => apiCall(id))
    .finally(() => {
      // Cleanup after completion (success or failure)
      pendingRequests.delete(id);
    });
    // Store in-flight request
    pendingRequests.set(id, promise);
    return promise;
}

module.exports = deduplicatedFetch;
