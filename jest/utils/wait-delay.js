async function waitDelay(delayMs) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
}

module.exports = {
    waitDelay
};
