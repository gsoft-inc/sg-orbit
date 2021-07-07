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
                <EmailIcon />
                <Content>Your email to <strong>booking@spacetravel.com</strong> has been sent!</Content>
                <Button>Undo</Button>
            </Message>
        </Stack>
    );
};
