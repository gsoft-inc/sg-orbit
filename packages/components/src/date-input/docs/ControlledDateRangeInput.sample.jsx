() => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDatesChange = useCallback((event, newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        console.log(newStartDate, newEndDate);
    }, [setStartDate, setEndDate]);

    return (
        <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleDatesChange}
        />
    );
};
