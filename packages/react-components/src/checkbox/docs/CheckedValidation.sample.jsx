() => {
    const [isChecked, setIsChecked] = useState(false);

    const isValid = isChecked;

    const handleChange = useCallback(() => {
        setIsChecked(x => !x);
        console.log(!isChecked);
    }, [isChecked, setIsChecked]);

    return (
        <Checkbox
            validationState={isValid ? "valid" : "invalid"}
            checked={isChecked}
            onChange={handleChange}
        >
            Milky Way
        </Checkbox>
    );
};
