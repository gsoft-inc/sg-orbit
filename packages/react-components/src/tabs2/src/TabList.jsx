export function TabList({ children, ...rest }) {
    return (
        <div
            {...rest}
            className="o-ui-tabs"
            role="tablist"
            aria-orientation="horizontal"
        >
            {children}
        </div>
    );
}
