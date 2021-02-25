export function cancellablePromise(promise) {
    let isCancelled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            value => isCancelled ? reject({ isCancelled: true }) : resolve(value),
            error => isCancelled ? reject({ isCancelled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCancelled = true;
        }
    };
}
