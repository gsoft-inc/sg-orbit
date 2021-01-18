function CustomOption({ item, children, ...rest }) {
    const { selectedKeys } = useListboxContext();
    const { key } = item;

    return (
        <ListboxOption
            {...rest}
            item={item}
            className={cx({ "primary-600": selectedKeys.includes(key) })}
        >
            {children}
        </ListboxOption>
    );
}

render(() => {
    return (
        <Listbox aria-label="Planets">
            {["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Saturn", "Uranus"].map(x => (
                <CustomOption key={x.toLowerCase()}>{x}</CustomOption>
            ))}
        </Listbox>
    );
});
