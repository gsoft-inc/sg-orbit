function CustomSelect({
    placeholder,
    children,
    ...rest
}) {
    const { selectedItem, isOpen, triggerProps, overlayProps, listboxProps, valueProps } = useSelect(children);

    return (
        <>
            <Button
                {...rest}
                {...triggerProps}
                variant="secondary"
                width={{
                    base: "100%",
                    sm: "20rem"
                }}
            >
                <Text {...valueProps}>
                    {!isNil(selectedItem) ? selectedItem.text : placeholder}
                </Text>
                <DisclosureArrow
                    open={isOpen}
                    slot="end-icon"
                />
            </Button>
            <Overlay {...overlayProps}>
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

render(() =>
    <CustomSelect placeholder="Select a planet">
        <Item key="earth">Earth</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </CustomSelect>
);

