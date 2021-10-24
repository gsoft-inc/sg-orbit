import { useCallback, useState } from "react";

export function useForceRender() {
    const [, set] = useState(false);

    return useCallback(() => {
        set(x => !x);
    }, [set]);
}
