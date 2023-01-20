
import { Variants } from "./Variants";
import { any, string } from "prop-types";

const propTypes = {
    iconDisplayName: string.isRequired,
    variants: any.isRequired
};

export function IconDetail({ iconDisplayName, variants }) {
    return (
        <>
            <Variants iconDisplayName={iconDisplayName} variants={variants} />
        </>
    );
}

IconDetail.propTypes = propTypes;
