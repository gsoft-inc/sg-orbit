const postcss = require("postcss");

module.exports = postcss.plugin("postcss-remove-single-line-comments", () => {
    return css => {
        css.walkComments(comment => {
            const { source } = comment;

            if (source.start.line === source.end.line) {
                comment.remove();
            }
        });
    };
});
