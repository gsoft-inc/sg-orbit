export function SmallAvatar({ children, ...rest }) {
    return (
        <div
            {...rest}
            className="w5 h5 bg-primary-500 white f8 br-100 flex items-center justify-center"
        >
            {children}
        </div>
    );
}

export function LargeAvatar({ children, ...rest }) {
    return (
        <div
            {...rest}
            className="w7 h7 bg-primary-500 white br-100 flex items-center justify-center"
        >
            <span>{children}</span>
        </div>
    );
}
