import { useEffect, useState } from "react";

// Took from https://github.com/tailwindlabs/headlessui/blob/develop/packages/%40headlessui-react/src/utils/disposables.ts
export function disposables() {
    // eslint-disable-next-line no-shadow
    const disposables = [];

    const api = {
        requestAnimationFrame(...args) {
            const id = requestAnimationFrame(...args);
            api.add(() => cancelAnimationFrame(id));
        },

        nextFrame(...args) {
            api.requestAnimationFrame(...args);
        },

        add(callback) {
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
