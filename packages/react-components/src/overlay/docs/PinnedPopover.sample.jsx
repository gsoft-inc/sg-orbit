() => {
    const [isPinned, setIsPinned] = useState(true);
    const [boundaryElement, setBoundaryElement] = useState();

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
                    <Content className="bg-white ba b--primary-300 br2 shadow-200 pa3">Two monkeys, Able and Baker, became the <br /> first living creatures to survive a space flight.</Content>
                </Popover>
            </div>
            <div className="mt4">
                <Switch
                    checked={isPinned}
                    onChange={() => { setIsPinned(!isPinned); }}
                >
                        Pinned
                </Switch>
            </div>
        </>
    );
};
