function ActiveHeader({ tab, children, ...rest }) {
    const { selectedIndex } = useTabsContext();
    const { index } = tab;

    return (
        <Tab
            {...rest}
            tab={tab}
        >
            {index === selectedIndex ? <LightbulbIcon /> : <NotificationIcon />}
            <Text>{children}</Text>
        </Tab>
    );
}

render(() => {
    return (
        <Tabs aria-label="Planets">
            <Item>
                <ActiveHeader>Mars</ActiveHeader>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Tabs>
    );
});
