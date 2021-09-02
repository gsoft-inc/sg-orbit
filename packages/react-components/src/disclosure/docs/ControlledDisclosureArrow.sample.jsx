() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(x => !x);
        console.log(!isOpen);
    }, [isOpen, setIsOpen]);

    return (
        <TextLinkAsButton onClick={handleClick}>
            <Text>EVE Online</Text>
            <DisclosureArrow open={isOpen} />
        </TextLinkAsButton>
    );
};
