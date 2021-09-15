() => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = useCallback(() => {
        setIsVisible(x => !x);
    }, [setIsVisible]);

    return (
        <Div minHeight="80px">
            <Button onClick={handleToggle} marginBottom={4}>Toggle animation</Button>
            <Transition
                show={isVisible}
                enter="o-ui-fade-in"
                leave="o-ui-fade-out"
            >
                <Text>Earth is a small town with many neighborhoods in a very big universe.</Text>
            </Transition>
        </Div>
    );
};
