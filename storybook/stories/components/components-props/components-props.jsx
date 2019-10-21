import { Checkbox, Label, Menu, Tab } from "semantic-ui-react";
import { Props } from "@storybook/addon-docs/blocks";
import { arrayOf, node, shapeOf, string } from "prop-types";
import { useState } from "react";

const propTypes = {
    componentsDefinition: arrayOf(shapeOf({
        displayName: string.isRequired,
        component: node.isRequired
    })).isRequired
};

export function ComponentsProps({ componentsDefinition }) {
    const [isVisible, setIsVisible] = useState(false);

    const createPanes = () => {
        return componentsDefinition.map(x => {
            return {
                menuItem: x.displayName,
                render: () => <Tab.Pane attached={false}><Props of={x.component} /></Tab.Pane>
            };
        });
    };


    return (
        <Tab panes={createPanes()} />
    );
}

ComponentsProps.propTypes = propTypes;
