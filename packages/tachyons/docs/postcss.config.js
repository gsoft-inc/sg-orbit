const removeSingleLineComments = require("./plugins/remove-single-line-comments");

module.exports = {
    plugins: [
        removeSingleLineComments()
    ]
};
