function CustomComponent(props) {
    const [toolbarProps] = useToolbarProps();

    return (
        <Input
            {...props}
            {...omitProps(toolbarProps, ["orientation"])}
            border="alias-1"
            type="text"
        />
    );
}

render(() => {
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
});
