function uniqueCombinations<T>(array: Array<T>): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      result.push([array[i], array[j]]);
    }
  }

  return result;
}

export default uniqueCombinations;
