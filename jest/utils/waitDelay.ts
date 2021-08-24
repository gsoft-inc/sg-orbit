async function waitDelay(delayMs: number) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
}

export { waitDelay }
