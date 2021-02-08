import { useEffect, useState } from "react";

// we use function here since we copied the method from another repo and they use this
// eslint-disable-next-line @typescript-eslint/ban-types
type DisposableFunction = Function;

// Took from https://github.com/tailwindlabs/headlessui/blob/develop/packages/%40headlessui-react/src/utils/disposables.ts
export function disposables() {
    // eslint-disable-next-line no-shadow
    const disposables: DisposableFunction[] = [];

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
            disposables.push(callback);
        },

        dispose() {
            disposables.splice(0).forEach(dispose => dispose());
        }
    };

    return api;
}

export function useDisposables() {
    // Using useState instead of useRef so that we can use the initializer function.
    const [d] = useState(disposables);

    useEffect(() => {
        return () => d.dispose();
    }, [d]);

    return d;
}
