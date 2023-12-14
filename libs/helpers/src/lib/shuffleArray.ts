function shuffleArray<T>(array: Array<T>): Array<T> {
    const tempArr = [...array]
    
    for (let i = tempArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]]
    }
    
    return tempArr
}


export default shuffleArray