export function Color({ value }) {
    return (
        <div className="flex items-center">
            <div className="w4 h4 ba o-ui-border-1 br2 mr2" style={{ backgroundColor: value }}></div>
            {value}
        </div>
    );
}
