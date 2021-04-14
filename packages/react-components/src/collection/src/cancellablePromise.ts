export interface CancellablePromise<T> {
    promise: Promise<T>;
    cancel: () => void;
}

export interface PromiseStatus {
    isCancelled: boolean;
}

export function cancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
    let isCancelled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
        promise.then(
            value => isCancelled ? reject(<PromiseStatus>{ isCancelled: true }) : resolve(value),
            error => isCancelled ? reject(<PromiseStatus>{ isCancelled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCancelled = true;
        }
    };
}

export function isPromiseStatus(error: unknown): error is PromiseStatus {
    return (error as PromiseStatus)?.isCancelled !== undefined;
}
