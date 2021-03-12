import { createTextMaskInputElement } from "text-mask-core";
import { isNil } from "lodash";
import { useCallback, useEffect, useRef } from "react";

export function useMaskedInput({
    inputElement,
    mask
}) {
    const maskRef = useRef();

    useEffect(() => {
        if (!isNil(inputElement)) {
            maskRef.current = createTextMaskInputElement({
                inputElement,
                mask,
                guide: false
            });
        }
    }, [inputElement, mask]);

    return {
        onChange: useCallback(() => {
            maskRef.current?.update();
        }, [maskRef])
    };
}
