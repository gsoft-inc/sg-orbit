import "react";

declare module "react" {
    interface HTMLAttributes<T> {
        [`data-testid`]?: string;
    }

    interface SVGAttributes<T> {
        [`data-testid`]?: string;
    }
}
