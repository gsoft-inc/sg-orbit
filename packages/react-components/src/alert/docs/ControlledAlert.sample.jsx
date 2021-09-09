() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newValue) => {
        setIsOpen(newValue);
        console.log(newValue);
    }, [setIsOpen]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <AlertTrigger
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Button>Open</Button>
            <Alert
                primaryButtonLabel="Yes"
                secondaryButtonLabel="Postpone"
                cancelButtonLabel="No"
                onPrimaryButtonClick={handleClose}
                onSecondaryButtonClick={handleClose}
                onCancelButtonClick={handleClose}
            >
                <Heading>Autopilot</Heading>
                <Content>Are you use sure you want to engage autopilot?</Content>
            </Alert>
        </AlertTrigger>
    );
};
