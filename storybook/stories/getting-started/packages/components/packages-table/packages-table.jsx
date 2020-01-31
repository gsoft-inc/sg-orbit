import styles from "./packages.module.css";

import { ExternalLink, Table } from "@blocks";
import { arrayOf, node, oneOfType, shape, string } from "prop-types";
import { components } from "@storybook/components/html";

const Img = components.img;

const propTypes = {
    packages: arrayOf(shape({
        name: string.isRequired,
        description: oneOfType([string, node]).isRequired,
        relativePath: string.isRequired
    }))
};

function renderVersion(name) {
    return (
        <ExternalLink href={`https://www.npmjs.com/package/${name}`}>
            <Img src={`https://img.shields.io/npm/v/${name}.svg?maxAge=3600`} alt="npm"></Img>
        </ExternalLink>
    );
}

function renderDependencies(relativePath) {
    return (
        <ExternalLink href={`https://david-dm.org/gsoft-inc/sg-orbit.svg?path=${relativePath}`}>
            <Img src={`https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=${relativePath}`} alt="Dependency Status"></Img>
        </ExternalLink>
    );
}

function toRowValues({ name, description, relativePath }) {
    return [
        <><span className="b">{name}</span><br /><span className="i">{description}</span></>,
        renderVersion(name),
        renderDependencies(relativePath)
    ];
}

export function PackagesTable({ packages }) {
    return (
        <Table
            columns={[
                { title: "Package" },
                { title: "Version", className: styles.version },
                { title: "Dependencies", className: styles.dependencies }
            ]}
            rows={packages.map(x => toRowValues(x))}
        />
    );
}

PackagesTable.propTypes = propTypes;
