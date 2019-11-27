import styles from "./props-tabs.module.css";

import { Checkbox } from "semantic-ui-react";
import { Props } from "@storybook/addon-docs/blocks";
import { Tabs } from "@storybook/components";
import { any, arrayOf, shape, string } from "prop-types";
import { useStorage } from "./use-storage";
import cx from "classnames";

const propTypes = {
    componentsDefinitions: arrayOf(shape({
        displayName: string.isRequired,
        component: any.isRequired
    })).isRequired
};

export function PropsTabs({ componentsDefinitions }) {
    const [state, setState] = useStorage({ isVisible: false, activeTab: 0 });

    if (componentsDefinitions.length === 0) {
        throw new Error(`${PropsTabs.name} - At least one component definition must be provided.`);
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
                {/* eslint-disable-next-line jsx-control-statements/jsx-use-if-tag */}
                { ({ active }) => active ? <Props of={x.component} /> : null }
            </div>;
        });
    };

    const hasMultipleComponents = componentsDefinitions.length > 1;

    return (
        <div className={`relative flex flex-column props-table ${cx({ [styles.noTabs]: !hasMultipleComponents })}`}>
            <div className={state.isVisible ? "mb7" : "mb3"}>
                <Checkbox
                    label={`View component${hasMultipleComponents ? "s" : ""} props`}
                    checked={state.isVisible}
                    toggle
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
                        <Props of={componentsDefinitions[0].component} className={styles.noTabs} />
                    </If>
                </Otherwise>
            </Choose>
        </div>
    );
}

PropsTabs.propTypes = propTypes;
