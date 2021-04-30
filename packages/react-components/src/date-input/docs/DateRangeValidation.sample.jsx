() => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const isValid = useMemo(() => (!startDate || startDate >= new Date(1970, 0, 5)) && (!endDate || endDate <= new Date(2021, 0, 5)), [startDate, endDate]);

    console.log(isValid);

    return (
        <DateRangeInput
            validationState={isValid ? "valid" : "invalid"}
            startDate={startDate}
            endDate={endDate}
            onDatesChange={(event, newStartDate, newEndDate) => {
                setStartDate(newStartDate);
                setEndDate(newEndDate);

                console.log(newStartDate, newEndDate);
            }}
        />
    );
};
