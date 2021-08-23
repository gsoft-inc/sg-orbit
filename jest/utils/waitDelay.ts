async function waitDelay(delayMs: number) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
}

module.exports = {
    waitDelay
};

export {waitDelay}
