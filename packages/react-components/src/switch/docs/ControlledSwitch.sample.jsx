() => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = useCallback(() => {
        setIsChecked(x => !x);
        console.log(!isChecked);
    }, [isChecked, setIsChecked]);

    return (
        <Switch
            checked={isChecked}
            onChange={handleChange}
        >
            {isChecked ? "On" : "Off"}
        </Switch>
    );
};
