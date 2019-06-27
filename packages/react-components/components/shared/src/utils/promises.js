/**
 * Make an existing promise cancellable.
 *
 * @param {Promise} promise
 * @returns {Object}
 * @example
 * const myCancellablePromise = cancellablePromise(promise);
 *
 * myCancellablePromise.then(value => { ... });
 *
 * myCancellablePromise.catch(error => {
 *    if (error.isCanceled) { console.log("Promise has been canceled."); }
 * });
 *
 * myCancellablePromise.cancel();
 */
export function cancellablePromise(promise) {
    let isCancelled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        // prettier-ignore
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
