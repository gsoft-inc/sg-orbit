() => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Checkbox
            checked={isChecked}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            {isChecked ? "On" : "Off"}
        </Checkbox>
    );
};
