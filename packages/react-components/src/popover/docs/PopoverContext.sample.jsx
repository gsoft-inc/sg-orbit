const CustomTrigger = forwardRef(({ children, ...rest }, ref) => {
    const { isOpen } = usePopoverTriggerContext();

    return (
        <Button
            {...rest}
            color={isOpen ? "primary" : undefined}
            ref={ref}
        >
            Trigger
        </Button>
    );
});

function CustomPopover({ children, ...rest }) {
    const { close } = usePopoverTriggerContext();

    const handleClose = useCallback(event => {
        close(event);
    }, [close]);

    return (
        <Popover {...rest}>
            {children}
            <Button onClick={handleClose}>Close</Button>
        </Popover>
    );
}

render(() => {
    return (
        <PopoverTrigger>
            <CustomTrigger />
            <CustomPopover>
                <Heading>WikiSpace</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            </CustomPopover>
        </PopoverTrigger>
    );
});

