import { ComponentProps, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { InnerImageProps, Image as OrbitImage } from "./Image";
import { forwardRef, isNil } from "../../shared";

interface InnerAsyncImageProps extends InnerImageProps {
    /**
     * The number of milliseconds to delay the rendering of the fallback.
     */
    delay?: number;
    /**
     * The allowed number of retry to load the async image.
     */
    retryCount?: number;
    /**
     * React children.
     */
    children: ReactNode;
}

function InnerAsyncImage({
    src,
    delay = 250,
    retryCount = 5,
    children,
    forwardedRef,
    ...rest
}: InnerAsyncImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    const [canRender, setCanRender] = useState(false);

    const imageRef = useRef<HTMLImageElement>();

    if (retryCount < 1) {
        throw new Error("An async image retry count must be equal or greater to 1.");
    }

    const dispose = () => {
        if (!isNil(imageRef.current)) {
            imageRef.current.onload = null;
            imageRef.current.onerror = null;
            imageRef.current = null;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setCanRender(true);
        }, delay);
    }, [delay]);

    // Reset  when the "src" change.
    useEffect(() => {
        setIsLoaded(false);
        setFailureCount(0);
    }, [src]);

    useEffect(() => {
        if (!isLoaded && failureCount < retryCount) {
            imageRef.current = new Image();
            imageRef.current.src = src;

            imageRef.current.onload = () => {
                dispose();
                setIsLoaded(true);
            };

            imageRef.current.onerror = () => {
                dispose();
                setFailureCount(failureCount + 1);
            };

            return () => {
                dispose();
            };
        }
    }, [src, retryCount, isLoaded, failureCount]);

    if (!canRender && !isLoaded) {
        return null;
    }

    if (isLoaded) {
        return (
            <OrbitImage
                {...rest}
                src={src}
                ref={forwardedRef}
            />
        );
    }

    return children as ReactElement;
}

export const AsyncImage = forwardRef<InnerAsyncImageProps>((props, ref) => (
    <InnerAsyncImage {...props} forwardedRef={ref} />
));

export type AsyncImageProps = ComponentProps<typeof AsyncImage>;

AsyncImage.displayName = "AsyncImage";
