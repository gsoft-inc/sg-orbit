async function waitFor(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));
}

module.exports = {
    waitFor
};
