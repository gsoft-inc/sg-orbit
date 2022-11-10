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

Default.storyName = "default";

export const Controlled = () =>
    <Inline>
        <DisclosureArrow open={false} />
        <DisclosureArrow open />
    </Inline>;

Controlled.storyName = "controlled";

export const Context = () =>
    <Inline>
        <DisclosureContext.Provider value={{ isOpen: false }}>
            <DisclosureArrow />
        </DisclosureContext.Provider>
        <DisclosureContext.Provider value={{ isOpen: true }}>
            <DisclosureArrow />
        </DisclosureContext.Provider>
    </Inline>;

Context.storyName = "context";

export const Styling = () =>
    <Inline>
        <DisclosureArrow open className="border-red" />
        <DisclosureArrow open style={{ border: "1px solid red" }} />
    </Inline>;

Styling.storyName = "styling";
