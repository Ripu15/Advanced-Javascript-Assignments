// Problem Description – Sum of Two Promises

// You are given two Promises that each resolve to numeric values. 
// Your task is to return a new Promise that resolves to the sum of these two numbers. 
// Both Promises should be executed in parallel using Promise.all to avoid unnecessary waiting.
async function sumPromises(p1, p2) {
    //Both p1 and p2 start at the same time
    //await pauses until both resolve
    const [v1, v2] = await Promise.all([p1, p2]);
    //Return value is wrapped in a Promise
    //Because the function is async
    return v1 + v2;
}

module.exports = sumPromises;

