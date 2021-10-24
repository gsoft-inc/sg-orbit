() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newValue) => {
        setIsOpen(newValue);
        console.log(newValue);
    }, [setIsOpen]);

    return (
        <TooltipTrigger
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Earth is a small town with many neighborhoods in a very big universe.</Tooltip>
        </TooltipTrigger>
    );
};
