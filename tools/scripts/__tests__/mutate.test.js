import { getChunkedRows } from "../utils";

const _chunkNum = 10;
const _makeRows = (n) => Array.from({ length: n }, (_, i) => i);

test("< chunkNum", () => {
  const rows = _makeRows(_chunkNum - 1);
  expect(getChunkedRows(rows, _chunkNum)).toEqual([[0, 1, 2, 3, 4, 5, 6, 7, 8]]);
});

test("> chunkNum", () => {
  const rows = _makeRows(_chunkNum * 2);
  expect(getChunkedRows(rows, _chunkNum)).toEqual([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  ]);
});
