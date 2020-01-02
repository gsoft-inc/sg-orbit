module.exports = {
    plugins: [
        require("./postcss-prefixer")({
            prefix: "sbdocs.sbdocs."
        })
    ]
};
