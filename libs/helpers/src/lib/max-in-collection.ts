function maxInCollection<T>(collection: Map<T, number>): [T, number] | null {
  if (!collection.size) {
    return null;
  }

  return [...collection.entries()].reduce((acc, curr) => {
    return curr[1] > acc[1] ? curr : acc;
  });
}

export default maxInCollection;
