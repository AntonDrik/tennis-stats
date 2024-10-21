function chunk<T>(arr: Array<T>, size: number) {
  return arr.reduce((acc, curr, index) => {
    return index % size === 0
      ? [...acc, [curr]]
      : [...acc.slice(0, -1), [...acc.slice(-1)[0], curr]];
  }, [] as T[][]);
}

export default chunk;
