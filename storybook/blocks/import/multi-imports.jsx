import styles from "./multi-imports.module.css";

import { Button } from "@orbit-ui/react-button";
import { Source } from "@storybook/components";
import { arrayOf, shape, string } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";
import { useLocalStorage } from "@shared/use-storage";
import dedent from "dedent";

const VERSION_SHAPE = {
    label: string.isRequired,
    code: string.isRequired
};

const propTypes = {
    versions: arrayOf(shape(VERSION_SHAPE)).isRequired,
    language: string,
    className: string
};

const defaultProps = {
    language: "javascript"
};

export function MultiImports({ versions, language, className }) {
    const [current, setCurrent] = useLocalStorage("@orbit-ui/storybook/selected-import", versions[0].label);

    const renderLabels = () => {
        return (
            <div className="flex justify-end">
                {versions.map(x => {
                    const isCurrent = x.label === current;

                    return (
                        <Button
                            naked
                            className={`pa0 pl2 ${styles.labelButton} ${isCurrent ? "primary-900 fw5" : "primary-700 fw4" }`}
                            size="small"
                            onClick={() => {
                                setCurrent(x.label);
                            }}
                            key={x.label}
                        >
                            {x.label}
                        </Button>
                    );
                })}
            </div>
        );
    };

    const classes = mergeClasses(
        "mb1 mt4",
        className
    );

    const renderCodeBlocks = () => {
        return versions
            .filter(x => x.label === current)
            .map(x => {
                return (
                    <Source language={language} dark format={false} code={dedent(x.code)} className={classes} key={x.label} />
                );
            });
    };

    return (
        <>
            {renderCodeBlocks()}
            {renderLabels()}
        </>
    );
}

MultiImports.propTypes = propTypes;
MultiImports.defaultProps = defaultProps;
