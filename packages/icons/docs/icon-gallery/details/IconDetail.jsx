
import { Variants } from "./Variants";
import { any, string } from "prop-types";

const propTypes = {
    iconDisplayName: string.isRequired
};

export function IconDetail({ iconDisplayName }) {
    return (
        <>
            <Variants iconDisplayName={iconDisplayName} />
        </>
    );
}

IconDetail.propTypes = propTypes;
