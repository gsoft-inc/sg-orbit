export function isElementInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const documentElement = document.documentElement;

    return (
        // Make sure it's visible in the document element.
        rect.bottom <= documentElement.clientHeight && rect.right <= documentElement.clientWidth &&
        // Make sure if the user scrolled, it's still visible.
        rect.bottom >= documentElement.scrollTop && rect.right >= documentElement.scrollLeft
    );
}
