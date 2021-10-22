import { Span } from "../../html";
import { VisuallyHidden } from "../../visually-hidden";

export function NewTabIndicator() {
    return (
        <VisuallyHidden as={Span}>(opens in a new tab)</VisuallyHidden>
    );
}
