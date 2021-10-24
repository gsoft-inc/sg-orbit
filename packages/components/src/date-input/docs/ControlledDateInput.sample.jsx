() => {
    const [date, setDate] = useState(null);

    const handleDateChange = useCallback((event, newDate) => {
        setDate(newDate);
        console.log(newDate);
    }, [setDate]);

    return (
        <DateInput
            value={date}
            onDateChange={handleDateChange}
        />
    );
};
