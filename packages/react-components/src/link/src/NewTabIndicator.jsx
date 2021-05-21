import { VisuallyHidden } from "../../visually-hidden";

export function NewTabIndicator() {
    return (
        <VisuallyHidden as="span">(opens in a new tab)</VisuallyHidden>
    );
}
