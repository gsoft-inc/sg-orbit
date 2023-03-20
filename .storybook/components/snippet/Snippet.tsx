import "./Snippet.css";

import { ComponentProps } from "react";
import Highlight from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

export const CodeTheme = theme;


interface CodeBlockProps extends Omit<ComponentProps<typeof Highlight>, "children" | "Prism">{
    className?: string;
}

export interface SnippetProps extends CodeBlockProps {
    filePath?: string;
}

export function Snippet({ code, filePath, language = "jsx", ...rest }: SnippetProps) {
    return <>{code ?? filePath}</>
}

