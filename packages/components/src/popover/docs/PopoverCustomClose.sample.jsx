const CustomClosePopover = forwardRef(({ children, ...rest }, ref) => {
    const { close } = usePopoverTriggerContext();

    return (
        <Popover
            {...rest}
            ref={ref}
        >
            <Heading>WikiSpace</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Button onClick={close} variant="secondary">Close</Button>
        </Popover>
    );
});

render(() => {
    return (
        <PopoverTrigger dismissable={false}>
            <Button variant="secondary">Trigger</Button>
            <CustomClosePopover />
        </PopoverTrigger>
    );
});
