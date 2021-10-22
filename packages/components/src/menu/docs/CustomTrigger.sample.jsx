const CustomTrigger = forwardRef((props, ref) => {
    const { isOpen } = useMenuTriggerContext();

    return (
        <IconButton
            {...props}
            variant={isOpen ? "primary" : "secondary"}
            aria-label="View tasks"
            ref={ref}
        >
            <VerticalDotsIcon />
        </IconButton>
    );
});

render(
    <MenuTrigger>
        <CustomTrigger />
        <Menu>
            <Item key="launch">Launch...</Item>
            <Item key="eject">Eject...</Item>
            <Item key="land">Land...</Item>
            <Divider />
            <Item key="help">Help</Item>
            <Item key="exit">Exit</Item>
        </Menu>
    </MenuTrigger>
);
