() => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Popover
            show={isVisible}
            onVisibilityChange={(event, newVisibility) => { setIsVisible(newVisibility); }}
        >
            <Button>Toggle</Button>
            <Square>
                <TextLink as="button" className="mt6 ml5" onClick={() => { setIsVisible(false); }}>
                    Close
                </TextLink>
            </Square>
        </Popover>
    );
};
