// Problem Description – Non-Blocking Large items Processing

// You are given a very large items containing around 100,000 items that must be processed. 
// Your task is to implement a strategy that performs this processing without blocking the main thread, ensuring the browser UI remains responsive. 
// The solution should break the work into smaller chunks and schedule them asynchronously.

async function processLargeitems(items, processFn) {
  if (!Array.isArray(items) || items.length === 0) return;

  const CHUNK_SIZE = 100; // safe default
  let index = 0;

  while (index < items.length) {
    const end = Math.min(index + CHUNK_SIZE, items.length);

    // process one chunk synchronously
    for (let i = index; i < end; i++) {
      processFn(items[i]);
    }
    
    index = end;

    // yield control back to event loop (non-blocking)
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}


module.exports = processLargeitems;
