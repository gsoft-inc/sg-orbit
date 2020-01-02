// Copied from https://github.com/marceloucker/postcss-prefixer

const postcss = require("postcss");
const Tokenizer = require("css-selector-tokenizer");
const {
    parseAttrSelector,
    attrStringify,
    itMatchsOne
} = require("./utils");


const prefixNode = (node, prefix) => {
    if (["class", "id"].includes(node.type)) {
        return Object.assign({}, node, { name: `${prefix}${node.name}` });
    }

    if (["attribute"].includes(node.type) && node.content) {
        const {
            type, operator, head, classes, foot
        } = parseAttrSelector(node);

        if (!["class", "id"].includes(type)) {return node;}

        return Object.assign({}, node, {
            content: attrStringify({
                type,
                operator,
                head,
                classes: classes.map(cls => `${prefix}${cls}`),
                foot
            })
        });
    }

    return node;
};

const interateSelectorNodes = (selector, options) => Object.assign({}, selector, {
    nodes: selector.nodes.map(node => {
        if (["selector", "nested-pseudo-class"].includes(node.type)) {
            return interateSelectorNodes(node, options);
        }

        if (itMatchsOne(options.ignore, Tokenizer.stringify(node))) {return node;}

        return prefixNode(node, options.prefix);
    })
});


const prefixer = options => css => {
    const { prefix, ignore } = Object.assign({}, {
        prefix: "",
        ignore: []
    }, options);

    if (typeof prefix !== "string") {
        throw new Error("@postcss-prefix: prefix option should be of type string.");
    }

    if (!Array.isArray(ignore)) {
        throw new Error("@postcss-prefix: ignore options should be an Array.");
    }

    if (!prefix.length) {return;}


    css.walkRules(rule => {
        const { selector } = rule;

        /* eslint no-param-reassign: "off" */
        const prefixedSelector = Tokenizer.stringify(interateSelectorNodes(
            Tokenizer.parse(selector),
            { prefix, ignore }
        ));

        // FIX: Tokenizer.stringify is adding a \ before the ".", not sure why.
        rule.selector = prefixedSelector.replace(/\\./g, ".");
    });
};

module.exports = postcss.plugin("postcss-prefixer", prefixer);
