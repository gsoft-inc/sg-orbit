import styles from "./props.module.css";

import { Props as StorybookProps } from "@storybook/addon-docs/blocks";
import { Tabs } from "@storybook/components";
import { Toggle } from "@react-components/toggle";
import { any, arrayOf, shape, string } from "prop-types";
import { mergeClasses } from "@react-components/shared";
import { useStorage } from "./use-storage";

const propTypes = {
    componentsDefinitions: arrayOf(shape({
        displayName: string.isRequired,
        component: any.isRequired
    })).isRequired
};

export function Props({ componentsDefinitions }) {
    const [state, setState] = useStorage({ isVisible: false, activeTab: 0 });

    if (componentsDefinitions.length === 0) {
        throw new Error(`${Props.name} - At least one component definition must be provided.`);
    }

    const handleToggleChange = () => {
        setState({ isVisible: !state.isVisible, activeTab: state.activeTab });
    };

    const handleTabSelected = tabId => {
        setState({ isVisible: state.isVisible, activeTab: tabId });
    };

    const renderTabs = () => {
        return componentsDefinitions.map(x => {
            const id = `prop-tabs-${x.displayName}`;

            return <div key={id} id={id} title={x.displayName}>
                { ({ active }) => active ? <StorybookProps key={id} of={x.component} /> : null }
            </div>;
        });
    };

    const hasMultipleComponents = componentsDefinitions.length > 1;

    const classes = mergeClasses(
        "relative flex flex-column props-table",
        !hasMultipleComponents && styles.noTabs
    );

    return (
        <div className={classes}>
            <div className={state.isVisible ? "mb5" : "mb3"}>
                <Toggle
                    text={`View component${hasMultipleComponents ? "s" : ""} props`}
                    checked={state.isVisible}
                    onChange={handleToggleChange}
                />
            </div>
            <Choose>
                <When condition={hasMultipleComponents && state.isVisible}>
                    <Tabs
                        selected={state.activeTab}
                        actions={{ onSelect: handleTabSelected }}
                    >
                        {renderTabs()}
                    </Tabs>
                </When>
                <Otherwise>
                    <If condition={state.isVisible}>
                        <StorybookProps of={componentsDefinitions[0].component} className={styles.noTabs} />
                    </If>
                </Otherwise>
            </Choose>
        </div>
    );
}

Props.propTypes = propTypes;
