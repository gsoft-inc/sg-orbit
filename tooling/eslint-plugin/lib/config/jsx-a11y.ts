import type { Linter } from "eslint";
import { sourceFiles } from "../utils/patterns";

const config: Linter.Config = {
    overrides: [
        {
            files: sourceFiles,
            plugins: ["jsx-a11y"],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                // This rule ensures that all labels have an associated control that they are labeling.
                // However, this rule causes a lot of false positive, since our current implementation of our company's design system
                // does not use the "for" attribute in the label element and automatically add it inside Fields.
                // Therefore, we are disabling this rule.
                "jsx-a11y/label-has-associated-control:": "off"
            },
            settings: {
                "jsx-a11y": {
                    components: {
                        // HTML Components Wrappers
                        "A":"a",
                        "Address":"address",
                        "Article":"article",
                        "HtmlButton":"button",
                        "Div":"div",
                        "HtmlFooter":"footer",
                        "HtmlForm":"form",
                        "HtmlH1":"h1",
                        "HtmlH2":"h2",
                        "HtmlH3":"h3",
                        "HtmlH4":"h4",
                        "HtmlH5":"h5",
                        "HtmlH6":"h6",
                        "HtmlHeader":"header",
                        "Img":"img",
                        "HtmlInput":"input",
                        "HtmlLabel":"label",
                        "LI":"li",
                        "Main":"main",
                        "Nav":"nav",
                        "OL":"ol",
                        "HtmlParagraph":"p",
                        "HtmlSection":"section",
                        "Span":"span",
                        "Table":"table",
                        "TBody":"tbody",
                        "TD":"td",
                        "HtmlTextArea":"textarea",
                        "TFoot":"tfoot",
                        "TH":"th",
                        "THead":"thead",
                        "TR":"tr",
                        "UL":"ul",

                        // Orbit components that are simple HTML element wrappers and behave like html elements
                        Label : "label",
                        Link : "a",
                        TextLink : "a",
                        IconLink  : "a",
                        TileLink : "a",
                        Paragraph : "p",
                        Text: "span",

                        // Orbit components that are basically Divs synthax shortcuts and behave like html elements
                        Flex : "div",
                        Grid : "div",
                        Inline : "div",
                        Stack : "div",
                        ThemeProvider : "div",
                        Divider : "div",
                        Transition  : "div"
                    }
                }
            }
        }
    ]
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
