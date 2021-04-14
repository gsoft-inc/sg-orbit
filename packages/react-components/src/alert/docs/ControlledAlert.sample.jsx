() => {
    const [show, setShow] = useState(true);

    const toggleAlert = useCallback(() => {
        setShow(x => !x);
        console.log(!show);
    }, [show, setShow]);

    return (
        <Stack>
            <Button
                color="secondary"
                onClick={toggleAlert}
            >
                {show ? "Hide" : "Show"}
            </Button>
            <Alert
                show={show}
                onDismiss={toggleAlert}
            >
                <MailIcon />
                <Content>Your email to <strong>booking@spacetravel.com</strong> has been sent!</Content>
                <Button>Undo</Button>
            </Alert>
        </Stack>
    );
};
