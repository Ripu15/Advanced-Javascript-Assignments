// Problem Description – Chunk Array
//
// When dealing with large datasets, it's often necessary to process them
// in smaller batches (chunks) to avoid overloading the CPU or I/O.
//
// Your task is to implement a function `chunkArray(array, size)` that
// splits an array into sub-arrays of a maximum specified size.
//
// Requirements:
// 1. The function should return a new array containing the chunks.
// 2. The last chunk might be smaller than the specified size.
// 3. Handle edge cases like empty arrays or chunk size <= 0.
//
// This is a prerequisite for common patterns like batching API calls.

function chunkArray(array, size) {
  // invalid input
  if (!Array.isArray(array)) return [];

  // invalid size
  if (size <= 0) return [];

  // empty array
  if (array.length === 0) return [];

  // chunk size larger than array
  if (size >= array.length) return [array];

  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
// const arr = [1,2,3,4,5,6,7,8,9,10];
// const matrix = chunkArray(arr, 3);
// console.log(matrix);
module.exports = chunkArray;
