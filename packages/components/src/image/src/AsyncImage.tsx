import { AbstractImageProps, Image as OrbitImage } from "./Image";
import { ComponentProps, ReactElement, ReactNode, forwardRef, useEffect, useState } from "react";
import { OmitInternalProps, isNil, mergeProps, slot, useRefState } from "../../shared";

const DefaultElement = "img";

export interface InnerAsyncImageProps extends AbstractImageProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The number of milliseconds to delay the rendering of the fallback.
     */
    delay?: number;
    /**
     * The allowed number of retry to load the async image.
     */
    retryCount?: number;
}

function InnerAsyncImage({
    as = DefaultElement,
    children,
    delay = 250,
    forwardedRef,
    retryCount = 5,
    src,
    ...rest
}: InnerAsyncImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    const [canRender, setCanRender] = useState(false);
    const [canRenderTimeoutIdRef, setCanRenderTimeoutId] = useRefState<ReturnType<typeof setTimeout>>();

    if (retryCount < 1) {
        throw new Error("An async image retry count must be equal or greater to 1.");
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCanRender(true);
        }, delay);

        setCanRenderTimeoutId(timeoutId);

        return () => clearTimeout(timeoutId);
    }, [delay, setCanRenderTimeoutId]);

    // Reset when the image "src" change.
    useEffect(() => {
        setIsLoaded(false);
        setFailureCount(0);
    }, [src]);

    useEffect(() => {
        if (!isLoaded && failureCount < retryCount) {
            let image = new Image();
            const timeoutId = canRenderTimeoutIdRef.current;

            const disposeImage = () => {
                if (!isNil(image)) {
                    image.onload = null;
                    image.onerror = null;
                    image = null;
                }
            };

            image.src = src;

            image.onload = () => {
                disposeImage();

                setIsLoaded(true);

                if (!isNil(timeoutId)) {
                    clearTimeout(timeoutId);
                }
            };

            image.onerror = () => {
                disposeImage();

                setFailureCount(failureCount + 1);
            };

            return () => {
                disposeImage();
                if (!isNil(timeoutId)) {
                    clearTimeout(timeoutId);
                }
            };
        }
    }, [src, retryCount, isLoaded, failureCount, canRenderTimeoutIdRef]);

    if (!canRender && !isLoaded) {
        return null;
    }

    if (isLoaded) {
        return (
            <OrbitImage
                {...mergeProps(
                    rest,
                    {
                        as,
                        ref: forwardedRef,
                        src
                    }
                )}
            />
        );
    }

    return children as ReactElement;
}

InnerAsyncImage.defaultElement = DefaultElement;

export const AsyncImage = slot("image", forwardRef<any, OmitInternalProps<InnerAsyncImageProps>>((props, ref) => (
    <InnerAsyncImage {...props} forwardedRef={ref} />
)));

export type AsyncImageProps = ComponentProps<typeof AsyncImage>;
