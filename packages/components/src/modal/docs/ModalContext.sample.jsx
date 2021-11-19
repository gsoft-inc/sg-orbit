const ApolloModal = forwardRef(({ children, ...rest }, ref) => {
    const { close } = useModalTriggerContext();

    return (
        <Modal
            {...rest}
            ref={ref}
        >
            <Heading>Apollo 11 movie</Heading>
            <Content>
                <Paragraph>Apollo 11 is a 2019 American documentary film edited, produced and directed by Todd Douglas Miller. It focuses on the 1969 Apollo 11 mission, the first spaceflight from which men walked on the Moon.</Paragraph>
                <Paragraph>
                    The film consists solely of archival footage, including 70 mm film previously unreleased to the public, and does not feature narration, interviews or modern recreations.
                    The Saturn V rocket, Apollo crew consisting of Buzz Aldrin, Neil Armstrong, and Michael Collins, and Apollo program Earth-based mission operations engineers are prominently featured in the film.
                </Paragraph>
            </Content>
            <Button onClick={close} variant="secondary">
                Close
            </Button>
        </Modal>
    );
});

render(() => {
    return (
        <ModalTrigger dismissable={false}>
            <Button variant="secondary">Open</Button>
            <ApolloModal />
        </ModalTrigger>
    );
});
