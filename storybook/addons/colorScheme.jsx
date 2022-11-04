import React from "react";
import { addons, types } from "@storybook/addons";
import { IconButton } from "@storybook/components";

const COLOR_SCHEME_EVENT_NAME = "color-scheme-event";
const COLOR_SCHEME_LOCALSTORAGE_KEY = "color-scheme";

const ColorScheme = ({ api }) => {
    const [colorScheme, setColorScheme] = React.useState(localStorage.getItem(COLOR_SCHEME_LOCALSTORAGE_KEY) ?? "light");
    const isDark = colorScheme === "dark";
    const channel = api.getChannel();

    const onToggle = () => {
        const newColorScheme = colorScheme === "light" ? "dark" : "light";
        setColorScheme(newColorScheme);
        localStorage.setItem(COLOR_SCHEME_LOCALSTORAGE_KEY, newColorScheme);
        channel.emit(COLOR_SCHEME_EVENT_NAME, newColorScheme);
    };

    return (
        <IconButton
            key="color-scheme"
            active
            title={isDark
                ? "Change theme to light mode"
                : "Change theme to dark mode"}
            onClick={onToggle}
        >
            {isDark ? "Light mode" : "Dark mode"}
        </IconButton>
    );
};

export function addonsColorScheme() {
    addons.register("orbit/color-scheme", api => {
        addons.add("orbit/color-scheme", {
            title: "Color scheme",
            type: types.TOOL,
            match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
            render: () => (<ColorScheme api={api} />)
        });
    });
}

export function useColorScheme() {
    const [colorScheme, setColorScheme] = React.useState(localStorage.getItem(COLOR_SCHEME_LOCALSTORAGE_KEY) ?? "light");

    React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on(COLOR_SCHEME_EVENT_NAME, setColorScheme);

        return () => {
            channel.off(COLOR_SCHEME_EVENT_NAME, setColorScheme);
        };
    }, []);
  
    return colorScheme;
}
