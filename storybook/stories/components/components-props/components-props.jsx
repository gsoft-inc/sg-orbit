import { Checkbox, Tab } from "semantic-ui-react";
import { Props } from "@storybook/addon-docs/blocks";
import { any, arrayOf, shape, string } from "prop-types";
import { useState } from "react";

import styles from "./components-props.module.css";

const propTypes = {
    componentsDefinitions: arrayOf(shape({
        displayName: string.isRequired,
        component: any.isRequired
    })).isRequired
};

export function ComponentsProps({ componentsDefinitions }) {
    const [isVisible, setIsVisible] = useState(false);

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
            <Tab panes={createPanes()} menu={{ text: true, compact: true }} onTabChange={() => setIsVisible(true)} className="flex-auto" />
            <div className={`absolute right-0 ${styles.test}`}>
                <Checkbox label="Props" checked={isVisible} toggle onChange={() => setIsVisible(!isVisible)} />
            </div>
        </div>
    );
}

ComponentsProps.propTypes = propTypes;
