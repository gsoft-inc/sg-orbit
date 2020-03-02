const postcss = require("postcss");

module.exports = postcss.plugin("postcss-remove-single-line-comments", () => {
    return css => {
        css.walkComments(comment => {
            const { source } = comment;
            // console.log(comment);
            // console.log("*******************");
            // console.log("*******************");

            if (source.start.line === source.end.line) {
                comment.remove();
            }

            // if (i.raws.inline) {
            //     i.remove();
            // }
        });
    };
});
