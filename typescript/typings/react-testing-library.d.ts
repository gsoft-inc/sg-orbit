import "react";

declare module "react" {
    // with ts 4.4 accept all data
    // `data-${string}`;
    interface HTMLAttributes<T> {
        [`data-testid`]?: string;
    }

    interface SVGAttributes<T> {
        [`data-testid`]?: string;
    }
}
