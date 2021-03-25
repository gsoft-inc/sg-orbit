import { createTextMaskInputElement } from "text-mask-core";
import { isNil } from "lodash";
import { useCallback, useEffect, useRef } from "react";

export interface UseMaskedInputProps {
    inputElement?: HTMLInputElement
    mask?: (string | RegExp)[]
}

export function useMaskedInput({
    inputElement,
    mask
}: UseMaskedInputProps) {
    const maskRef = useRef<any>();

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
