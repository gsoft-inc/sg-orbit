import { useEffect, useState } from "react";

// we use Function here since we copied the method from another repo and they use this
// we rename it to DisposableFunction so we don't have to add the @typescript-eslint/ban-types every time we use this type.
// eslint-disable-next-line @typescript-eslint/ban-types
type DisposableFunction = Function;

interface DisposableAPI {
    requestAnimationFrame(callback: FrameRequestCallback): void;
    nextFrame(callback: FrameRequestCallback): void;
    setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): void;
    add(callback: DisposableFunction): void;
    dispose(): void;
}

// Took from https://github.com/tailwindlabs/headlessui/blob/develop/packages/%40headlessui-react/src/utils/disposables.ts
export function disposables(): DisposableAPI {
    // eslint-disable-next-line no-shadow
    const _disposables: DisposableFunction[] = [];

    const api = {
        requestAnimationFrame(...args: Parameters<typeof requestAnimationFrame>) {
            const id = requestAnimationFrame(...args);
            api.add(() => cancelAnimationFrame(id));
        },

        nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
            api.requestAnimationFrame(...args);
        },

        setTimeout(...args: Parameters<typeof setTimeout>) {
            const timer = setTimeout(...args);
            api.add(() => clearTimeout(timer));
        },

        add(callback: DisposableFunction) {
            _disposables.push(callback);
        },

        dispose() {
            _disposables.splice(0).forEach(dispose => dispose());
        }
    };

    return api;
}

export function useDisposables(): DisposableAPI {
    // Using useState instead of useRef so that we can use the initializer function.
    const [d] = useState(disposables);

    useEffect(() => {
        return () => {
            d.dispose();
        };
    }, [d]);

    return d;
}
