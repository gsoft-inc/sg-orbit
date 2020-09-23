// Dummy component to demonstrate how to use with React Router.

export function RouterLink({ to, children }) {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href={`#${to}`}>{children}</a>
    );
}
