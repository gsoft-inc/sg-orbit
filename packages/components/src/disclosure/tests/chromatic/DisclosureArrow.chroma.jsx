import { DisclosureArrow, DisclosureContext } from "@components/disclosure";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/DisclosureArrow",
    component: DisclosureArrow,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () =>
    <DisclosureArrow open />;

export const Controlled = () =>
    <Inline>
        <DisclosureArrow open={false} />
        <DisclosureArrow open />
    </Inline>;

export const Context = () =>
    <Inline>
        <DisclosureContext.Provider value={{ isOpen: false }}>
            <DisclosureArrow />
        </DisclosureContext.Provider>
        <DisclosureContext.Provider value={{ isOpen: true }}>
            <DisclosureArrow />
        </DisclosureContext.Provider>
    </Inline>;

export const Styling = () =>
    <Inline>
        <DisclosureArrow open className="border-red" />
        <DisclosureArrow open style={{ border: "1px solid red" }} />
    </Inline>;

Default.storyName = "default";
Controlled.storyName = "controlled";
Context.storyName = "context";
Styling.storyName = "styling";
