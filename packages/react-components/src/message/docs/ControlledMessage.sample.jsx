() => {
    const [show, setShow] = useState(true);

    const toggleVisibility = useCallback(() => {
        setShow(x => !x);
        console.log(!show);
    }, [show, setShow]);

    return (
        <Stack style={{ minHeight: "110px" }}>
            <Button
                color="secondary"
                onClick={toggleVisibility}
            >
                {show ? "Hide" : "Show"}
            </Button>
            <Message
                show={show}
                onDismiss={toggleVisibility}
            >
                <Content>We offer the safest space travel of the industry!</Content>
                <Button>Book now</Button>
            </Message>
        </Stack>
    );
};
