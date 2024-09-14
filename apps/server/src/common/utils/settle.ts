/**
 * Returns a promise that is fulfilled with an array of promise state snapshots,
 * but only after all the original promises have settled, i.e. become either fulfilled or rejected.
 */
function settle<T>(promises: Promise<T>[]): Promise<T[]> {
    return Promise.allSettled(promises).then((results) => {
        const rejected = results.find(result => result.status === 'rejected') as PromiseRejectedResult
        
        if (rejected) {
            return Promise.reject(rejected.reason)
        }
        
        return results.map(result => (result as PromiseFulfilledResult<T>).value)
    })
}

export default settle