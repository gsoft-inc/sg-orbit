function CustomSelect({
    placeholder,
    "aria-label": ariaLabel,
    children,
    ...rest
}) {
    const { selectedItem, isOpen, triggerProps, overlayProps, listboxProps } = useSelect(children, {
        ariaLabel
    });

    return (
        <>
            <Button
                {...rest}
                {...triggerProps}
                color="secondary"
                width="20%"
            >
                <Text>{!isNil(selectedItem) ? selectedItem.text : placeholder}</Text>
                <DisclosureArrow
                    open={isOpen}
                    slot="end-icon"
                    size="sm"
                />
            </Button>
            <Overlay {...overlayProps}>
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

render(() =>
    <CustomSelect placeholder="Select a planet" aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </CustomSelect>
);
