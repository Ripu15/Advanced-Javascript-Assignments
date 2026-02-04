// Problem Description – Sequential Execution of Async Functions

// You are given an array of asynchronous functions. Your task is to execute them one by one, ensuring that each function starts only after the previous one has completed. 
// The final result should be an array of resolved values in the same order.

//'functions' is an array of async functions
async function runSequential(functions) {
    let res = [];
    for(let i = 0; i < functions.length; i++){
       res[i] =  await functions[i]();    
    }
    return res;
}

module.exports = runSequential;

