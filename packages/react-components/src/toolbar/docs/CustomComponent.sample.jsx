function CustomComponent(props) {
    const [toolbarProps] = useToolbarProps();

    return (
        <input
            {...props}
            {...omitProps(toolbarProps, ["orientation"])}
            type="text"
        />
    );
}

function CustomToolbar() {
    return (
        <Toolbar>
            <CustomComponent />
            <RadioGroup>
                <Radio value="mars">Mars</Radio>
                <Radio value="jupiter">Jupiter</Radio>
                <Radio value="pluton">Pluton</Radio>
            </RadioGroup>
        </Toolbar>
    );
}

render(
    <CustomToolbar />
);
