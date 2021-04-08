function AsyncText({ id, children, ...rest }) {
    const [text, setText] = useState(null);

    const { selectedKey } = useTabsContext();

    useEffect(() => {
        let timeoutId;

        if (id === selectedKey) {
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
    }, [id, selectedKey, children]);

    return (
        <Box {...rest}>
            {isNil(text) ? (
                <div className="pa10 relative">
                    <div className="loading"></div>
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
                        <Header>{header}</Header>
                        <Content>
                            <AsyncText id={id}>
                                {content}
                            </AsyncText>
                        </Content>
                    </Item>
                )}
        </Tabs>
    );
});
