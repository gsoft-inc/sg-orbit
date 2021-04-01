import { mergeProps } from "../../shared";

export function SmallAvatar({ children, ...rest }) {
    return (
        <div
            {...mergeProps(
                rest,
                {
                    className: "w5 h5 f9 bg-primary-500 white br-100 flex items-center justify-center"
                }
            )}
        >
            {children}
        </div>
    );
}

export function LargeAvatar({ children, ...rest }) {
    return (
        <div
            {...mergeProps(
                rest,
                {
                    className: "w7 h7 bg-primary-500 white br-100 flex items-center justify-center"
                }
            )}
        >
            <span>{children}</span>
        </div>
    );
}
