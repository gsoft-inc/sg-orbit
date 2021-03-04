import { mergeProps } from "../../shared";

export function Avatar({ children, ...rest }) {
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
