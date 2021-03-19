function AsyncText({ isSelected, children, ...rest }) {
    const [text, setText] = useState(null);

    useEffect(() => {
        let timeoutId;

        if (isSelected) {
            timeoutId = setTimeout(() => {
                setText(children);
            }, 2000);
        } else {
            setText(null);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [isSelected, children]);

    return (
        <Box {...rest}>
            {isNil(text) ? (
                <div className="pa10 relative">
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                </div>
            ) : text}
        </Box>
    );
}

render(() => {
    return (
        <Tabs manual aria-label="Planets">
            {[
                { id: "mars", header: "Mars", content: "Mars is the fourth planet from the Sun and the second-smallest planet." },
                { id: "jupiter", header: "Jupiter", content: "Jupiter is the fifth planet from the Sun and the largest in the Solar System." },
                { id: "venus", header: "Venus", content: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty." }
            ]
                .map(({ id, header, content }) =>
                    <Item key={id}>
                        {({ isSelected }) => (
                            <>
                                <Header>{header}</Header>
                                <Content>
                                    <AsyncText isSelected={isSelected}>
                                        {content}
                                    </AsyncText>
                                </Content>
                            </>
                        )}
                    </Item>
                )}
        </Tabs>
    );
});
