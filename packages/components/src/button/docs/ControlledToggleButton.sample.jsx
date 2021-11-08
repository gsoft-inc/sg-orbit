() => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = useCallback((event, newValue) => {
        setIsChecked(x => !x);
        console.log(!newValue);
    }, [setIsChecked]);

    return (
        <ToggleButton
            checked={isChecked}
            value="isActive"
            color={isChecked ? "primary" : "secondary"}
            variant="outline"
            onChange={handleChange}
        >
            {isChecked ? "On" : "Off"}
        </ToggleButton>
    );
};
