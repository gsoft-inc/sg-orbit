import { VisuallyHidden } from "../../visually-hidden";
import { as } from "../../shared";

const HiddenSpan = as(VisuallyHidden, "span");

export function NewTabIndicator() {
    return (
        <HiddenSpan>(opens in a new tab)</HiddenSpan>
    );
}
