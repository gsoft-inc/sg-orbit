function AsyncText({ isActive, children, ...rest }) {
    const [text, setText] = useState(null);

    useEffect(() => {
        let timeoutId;

        if (isActive) {
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
    }, [isActive, children]);

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
                { header: "Mars", content: "Mars is the fourth planet from the Sun and the second-smallest planet." },
                { header: "Jupiter", content: "Jupiter is the fifth planet from the Sun and the largest in the Solar System." },
                { header: "Venus", content: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty." }
            ]
                .map(({ header, content }) =>
                    <Item key={header}>
                        {({ isActive }) => (
                            <>
                                <Header>{header}</Header>
                                <Content>
                                    <AsyncText isActive={isActive}>
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
