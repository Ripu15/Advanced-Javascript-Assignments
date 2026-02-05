
// Problem Description – Recursive Fetch with Redirect Handling

// You are required to fetch data for a given set of IDs. 
// Each response may contain a redirectId, indicating that the data should be fetched again using the new ID. 
// The process must continue until the final data is reached. 
// Your implementation should also detect and prevent infinite redirect loops.

async function fetchDeep(ids, fetcher, maxDepth = 5) {
  const resolveOne = async (startId) => {
    const visited = new Set();

    let currentId = startId;
    let depth = 0;

    while (true) {
      if (visited.has(currentId)) {
        throw new Error("Infinite redirect loop detected");
      }

      visited.add(currentId);

      const result = await fetcher(currentId);

      // ✅ base case: final data
      if (!result || !result.redirectId) {
        return result;
      }

      // ✅ about to follow a redirect → check depth NOW
      if (depth >= maxDepth) {
        throw new Error("Max redirect depth exceeded");
      }

      currentId = result.redirectId;
      depth++;
    }
  };

  const entries = await Promise.all(
    Object.entries(ids).map(async ([key, startId]) => {
      const finalData = await resolveOne(startId);
      return [key, finalData];
    })
  );

  return Object.fromEntries(entries);
}



module.exports = fetchDeep;
