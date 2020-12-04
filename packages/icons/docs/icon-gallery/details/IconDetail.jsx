import { MultiVariant } from "./MultiVariant";
import { Variants } from "./Variants";
import { any, string } from "prop-types";

const propTypes = {
    iconDisplayName: string.isRequired,
    multiVariant: any.isRequired,
    variants: any.isRequired
};

export function IconDetail({ iconDisplayName, multiVariant, variants }) {
    return (
        <>
            <MultiVariant {...multiVariant} />
            <Variants iconDisplayName={iconDisplayName} variants={variants} />
        </>
    );
}

IconDetail.propTypes = propTypes;
