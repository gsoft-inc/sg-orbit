function CustomPopover({ children, ...rest }) {
    const { isOpen, close } = usePopoverTriggerContext();

    const handleClose = useCallback(event => {
        close(event);
    }, [close]);

    return (
        <Popover
            {...rest}
            className={cx({ "bg-primary-50": isOpen })}
        >
            {children}
            <Button onClick={handleClose}>Close</Button>
        </Popover>
    );
}

render(() => {
    return (
        <PopoverTrigger>
            <Button>Toggle</Button>
            <CustomPopover>
                <CrossButton slot="close-button" />
                <Header>WikiSpace</Header>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </CustomPopover>
        </PopoverTrigger>
    );
});

