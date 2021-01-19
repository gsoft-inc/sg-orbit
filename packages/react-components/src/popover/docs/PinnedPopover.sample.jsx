() => {
    const [isPinned, setIsPinned] = useState(true);
    const [boundaryElement, setBoundaryElement] = useState();

    const handleChange = useCallback(() => {
        setIsPinned(!isPinned);
    }, [isPinned, setIsPinned]);

    return (
        <>
            <div className="pinned-popover-boundary" ref={setBoundaryElement}>
                <Popover
                    show
                    pinned={isPinned}
                    position="top"
                    containerElement={boundaryElement}
                >
                    <Button>Toggle</Button>
                    <Square />
                </Popover>
            </div>
            <div className="mt4">
                <Switch
                    checked={isPinned}
                    onChange={handleChange}
                >
                    Pinned
                </Switch>
            </div>
        </>
    );
};
