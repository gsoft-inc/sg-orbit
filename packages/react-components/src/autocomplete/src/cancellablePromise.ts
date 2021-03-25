export interface CancellablePromise<T> {
    promise: Promise<T>;
    cancel(): void;
}

export function cancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
    let isCancelled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
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

