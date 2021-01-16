() => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Popover
            show={isVisible}
            onVisibilityChange={(event, newVisibility) => { setIsVisible(newVisibility); }}
        >
            <Button>Toggle</Button>
            <Content className="bg-white ba b--primary-300 br2 shadow-200 pa3">
                <Paragraph>Two monkeys, Able and Baker, became the <br /> first living creatures to survive a space flight.</Paragraph>
                <ButtonGroup align="center">
                    <Button size="sm" onClick={() => { setIsVisible(false); }}>Got it</Button>
                </ButtonGroup>
            </Content>
        </Popover>
    );
};
