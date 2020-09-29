export function Card({ children }) {
    return (
        <div className="flex flex-column items-center pa5 ba b--cloud-50" style={{ borderRadius: "var(--o-ui-rounded-border-radius)" }}>
            {children}
        </div>
    );
}
