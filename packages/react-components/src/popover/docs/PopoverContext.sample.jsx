const CustomTrigger = forwardRef(({
    children,
    ...rest
}, ref) => {
    const { isVisible, hide } = usePopoverContext();

    return (
        <Button
            {...rest}
            color={isVisible ? "secondary" : "primary"}
            ref={ref}
        >
            {children}
        </Button>
    );
});

render(() => {
    return (
        <Popover>
            <CustomTrigger>Toggle</CustomTrigger>
            <Square />
        </Popover>
    );
});


