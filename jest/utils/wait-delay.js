async function waitDelay(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));
}

module.exports = {
    waitDelay
};
