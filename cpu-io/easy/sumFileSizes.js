// Problem Description – Sum File Sizes
//
// You are given an array of file paths. Your task is to implement a function
// that returns the total size of all these files in bytes.
//
// Requirements:
// 1. Use fs.promises.stat() to get file information.
// 2. Return the sum of `size` property of all files.
// 3. Handle cases where a file might not exist (optional: you can let it throw or return 0).
// 4. Tasks should ideally be performed in parallel for efficiency.

const fs = require("fs").promises;
//filePaths: array of file paths
async function sumFileSizes(filePaths) {
 let sizeSum  = 0;
 for(const path of filePaths){
    try{
        const statsExists = await fs.stat(path);
        if(statsExists.isFile()){
           // const stats = await fs.stat(filePaths[i]);
            let fileSize = statsExists.size;
            sizeSum = sizeSum + fileSize;
        }
    }catch(err){
        throw err;
    }
   
 }
 return sizeSum;
}

module.exports = sumFileSizes;
