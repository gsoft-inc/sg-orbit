export function Card({ children }) {
    return (
        <div className="flex flex-column items-center pa5 ba b--cloud-50 br3 w-40">
            {children}
        </div>
    );
}
