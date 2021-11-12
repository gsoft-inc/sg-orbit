const CustomTrigger = forwardRef((props, ref) => {
    const { isOpen } = useTooltipTriggerContext();

    return (
        <IconButton
            {...props}
            color={isOpen ? "accent" : "secondary"}
            variant={isOpen ? "solid" : "outline"}
            aria-label="Email"
            size="xl"
            ref={ref}
        >
            <EmailIcon />
        </IconButton>
    );
});

render(
    <TooltipTrigger>
        <CustomTrigger />
        <Tooltip>Send an email to the orbital space station.</Tooltip>
    </TooltipTrigger>
);
