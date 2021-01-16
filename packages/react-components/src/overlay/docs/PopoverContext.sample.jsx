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
            <Content className="bg-white ba b--primary-300 br2 shadow-200 pa3">Two monkeys, Able and Baker, became the <br /> first living creatures to survive a space flight.</Content>
        </Popover>
    );
});


