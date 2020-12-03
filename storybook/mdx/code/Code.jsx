import { Snippet } from "@stories/components";

export function Code({ className, children, ...rest }) {
    // // markdown-to-jsx does not add className to inline code
    // if (typeof className !== "string" && (typeof children !== "string" || !children.match(/[\n\r]/g))) {
    //     return <Code>{children}</Code>;
    // }

    const language = className && className.split("-");

    return (
        <Snippet
            language={(language && language[1]) || "markup"}
            code={children}
            {...rest}
        />
    );
}
