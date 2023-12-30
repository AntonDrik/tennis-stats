function avgOfSet(set: Set<number>): number {
    const arr = Array.from(set.values())
    return arr.reduce((acc, curr) => acc + curr, 0) / arr.length
}

export default avgOfSet