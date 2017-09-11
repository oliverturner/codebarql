export const getRange = (i, n) => [i * n, i * n + n];

export const getChunkedRows = (rows, chunkNum) => {
  const n = Math.ceil(rows.length / chunkNum);

  return Array.from({ length: n }, (_, i) =>
    rows.slice(...getRange(i, chunkNum))
  );
};

// export const createChunk = (mutation) => (chunk, index) => {
//   console.log(`[${getRange(index, chunk.length).join("-")}] start`);
//   const chunkIds = await Promise.all(chunk.map(mutation));
//   console.log(`[${getRange(index, chunk.length).join("-")}] end`);
//   return chunkIds;
// };
