() => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibilityChange = useCallback((event, newVisibility) => {
        setIsVisible(newVisibility);
        consolelog(newVisibility);
    }, [setIsVisible]);

    const handleClick = useCallback(() => {
        setIsVisible(false);
    }, [setIsVisible]);

    return (
        <Popover
            show={isVisible}
            onVisibilityChange={handleVisibilityChange}
        >
            <Button variant="outline">Toggle</Button>
            <Square>
                <TextLink
                    as="button"
                    className="mt6 ml5"
                    onClick={handleClick}
                >
                    Close
                </TextLink>
            </Square>
        </Popover>
    );
};
