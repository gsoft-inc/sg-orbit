import "./Preview.css";

import {  ReactElement } from "react";

export interface PreviewProps {
    filePath?: string;
    language?: string;
    scope?: string;
    features?: boolean;
    mdxSource?: string;
    children?: ReactElement;
}

export function Preview({
    filePath,
    mdxSource,
    language,
    scope,
    children,
    ...rest
}: PreviewProps) {
    return (
        <>
            {children ?? filePath ?? mdxSource}
        </>
    )
}
