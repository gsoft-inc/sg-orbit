import { Checkbox, Tab } from "semantic-ui-react";
import { Props } from "@storybook/addon-docs/blocks";
import { any, arrayOf, shape, string } from "prop-types";
import { useState } from "react";

import styles from "./props-tabs.module.css";

const propTypes = {
    componentsDefinitions: arrayOf(shape({
        displayName: string.isRequired,
        component: any.isRequired
    })).isRequired
};

export function PropsTabs({ componentsDefinitions }) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleTabChange = (event, data) => {
        setActiveIndex(data.activeIndex);
        setIsVisible(true);
    };

    const createPanes = () => {
        return componentsDefinitions.map(x => {
            return {
                menuItem: x.displayName,
                render: () => {
                    return (
                        <If condition={isVisible}>
                            <Tab.Pane attached={false}>
                                <Props of={x.component} />
                            </Tab.Pane>
                        </If>
                    );
                }
            };
        });
    };

    return (
        <div className="relative">
            <Tab activeIndex={activeIndex} panes={createPanes()} menu={{ text: true, compact: true }} onTabChange={handleTabChange} className="flex-auto" />
            <div className={`absolute right-0 ${styles.checkboxTopPosition}`}>
                <Checkbox label="Props" checked={isVisible} toggle onChange={() => setIsVisible(!isVisible)} />
            </div>
        </div>
    );
}

PropsTabs.propTypes = propTypes;
