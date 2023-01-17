import React from "react";

declare module "react" {
    interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
        ["data-testid"]?: string;
    }

    interface SVGAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T>{
        ["data-testid"]?: string;
    }
}
