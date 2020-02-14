import styles from "./multi-variant.module.css";

import { Link } from "@blocks";
import { Source } from "@storybook/components";
import { cloneElement } from "react";
import { element } from "prop-types";

function renderImport(componentType) {
    return (
        <>
            <h4>Import</h4>
            <Source language="javascript" dark format={false} code={`import { ${componentType} } from "@orbit-ui/icons";`} />
        </>
    );
}

function renderUsage(componentType) {
    return (
        <>
            <h4>Usage</h4>
            <Source language="jsx" dark format={false} code={`<${componentType} />`} />
            <div className={`flex justify-end ${styles.learnUsage}`}>
                <Link href="?path=/docs/materials-icons--page#dimensions">Learn more about usage</Link>
            </div>
        </>
    );
}

function renderPreview(previewIcon) {
    return (
        <div className={styles.preview}>
            {cloneElement(previewIcon, { size: "tiny" })}
            {cloneElement(previewIcon, { size: "small" })}
            {previewIcon}
            {cloneElement(previewIcon, { size: "large" })}
            {cloneElement(previewIcon, { size: "big" })}
            {cloneElement(previewIcon, { size: "huge" })}
            {cloneElement(previewIcon, { size: "massive" })}
        </div>
    );
}

export function MultiVariant({ previewIcon }) {
    const componentType = previewIcon.props.mdxType;

    return (
        <>
            {renderPreview(previewIcon)}
            {renderImport(componentType)}
            {renderUsage(componentType)}
        </>
    );
}

MultiVariant.propTypes = {
    previewIcon: element.isRequired
};
