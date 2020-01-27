import { components } from "@storybook/components/html";
import { getGithubUrl } from "./get-github-url";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

const A = components.a;

export function InlineGithubLink({ path, children }) {
    return <A href={getGithubUrl(path)} target="_blank" rel="noopener noreferrer">{children}</A>;
}

InlineGithubLink.propTypes = propTypes;
