const HighlightedTrigger = forwardRef(({ children, ...rest }, ref) => {
    const { isOpen } = usePopoverTriggerContext();

    return (
        <Button
            {...rest}
            variant={isOpen ? "primary" : "secondary"}
            ref={ref}
        >
            Trigger
        </Button>
    );
});

render(() => {
    return (
        <PopoverTrigger>
            <HighlightedTrigger />
            <Popover>
                <Heading>WikiSpace</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            </Popover>
        </PopoverTrigger>
    );
});

