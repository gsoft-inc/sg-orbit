() => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <ToggleButton
            checked={isChecked}
            value="isActive"
            variant="outline"
            color={isChecked ? "primary" : undefined}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            {isChecked ? "On" : "Off"}
        </ToggleButton>
    );
};
