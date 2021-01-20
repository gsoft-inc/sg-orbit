export function Color({ value }) {
    return (
        <div className="flex items-center">
            <div className="w4 h4 ba b--o-ui-cloud-100 br2 mr2" style={{ backgroundColor: value }}></div>
            {value}
        </div>
    );
}
