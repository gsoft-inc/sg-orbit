import { useCallback, useState } from "react";

export function useForceRender(): () => void {
    const [, set] = useState(false);

    return useCallback(() => {
        set(x => !x);
    }, [set]);
}
