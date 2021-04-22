import "./Preview.css";

import { CodeTheme, useFormattedCode } from "@stories/components";
import { DocsContext, SourceContext, getSourceProps, storyBlockIdFromId } from "@storybook/addon-docs/blocks";
import { Editor as JarleEditor, Error as JarleError, Preview as JarlePreview, Provider as JarleProvider } from "jarle";
import { KnownScope } from "./scopes";
import { defaultDecorateStory } from "@storybook/client-api";
import { isNil } from "@react-components/shared";
import { object, string } from "prop-types";
import { storyNameFromExport, toId } from "@storybook/csf";
import { useContext, useState } from "react";

const propTypes = {
    filePath: string,
    language: string,
    scope: object
};

function CodeEditor({
    code,
    language = "jsx",
    scope: additionalScope = {},
    children,
    ...rest
}) {
    const formattedCoded = useFormattedCode(code, language);

    return (
        <div className="o-ui-sb-preview sbdocs sbdocs-preview">
            <JarleProvider
                code={formattedCoded}
                language={language}
                theme={CodeTheme}
                scope={{
                    ...KnownScope,
                    ...additionalScope
                }}
                showImports={false}
                {...rest}
            >
                <div className="o-ui-sb-preview-story docs-story">
                    {children}
                </div>
                <div className="o-ui-sb-preview-source">
                    <span className="o-ui-sb-preview-editable-label">Editable example</span>
                    <JarleEditor className="o-ui-sb-preview-editor" />
                    <JarleError className="o-ui-sb-preview-error" />
                </div>
            </JarleProvider>
        </div>
    );
}

function DecoratedLivePreview() {
    const docsContext = useContext(DocsContext);

    const decorators = docsContext.storyStore._globalMetadata.decorators;

    return decorators
        ? defaultDecorateStory(() => <JarlePreview />, decorators)(docsContext)
        : <JarlePreview />;
}

function FilePreview({ filePath, language, scope, noInline }) {
    const [code, setCode] = useState();

    if (isNil(code)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setCode(module.default);
            });

        return null;
    }

    return (
        <CodeEditor
            code={code}
            language={language}
            scope={scope}
            noInline={noInline}
        >
            <DecoratedLivePreview />
        </CodeEditor>
    );
}

function MdxSourcePreview({ mdxSource, language, scope, noInline }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const { code, language: inferredLanguage } = getSourceProps({ code: decodeURI(mdxSource) }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
            noInline={noInline}
        >
            <DecoratedLivePreview />
        </CodeEditor>
    );
}

function lookupStoryId(storyName, { mdxStoryNameToKey, mdxComponentMeta }) {
    return toId(
        mdxComponentMeta.id || mdxComponentMeta.title,
        storyNameFromExport(mdxStoryNameToKey[storyName])
    );
}

function StoryPreview({ language, scope, noInline, children }) {
    const docsContext = useContext(DocsContext);
    const sourceContext = useContext(SourceContext);

    const storyId = children.props.id || lookupStoryId(children.props.name, docsContext);

    const { code, language: inferredLanguage } = getSourceProps({ ids: [storyId] }, docsContext, sourceContext);

    return (
        <CodeEditor
            code={code}
            language={language ?? inferredLanguage}
            scope={scope}
            noInline={noInline}
        >
            <div id={storyBlockIdFromId(storyId)}>
                <DecoratedLivePreview />
            </div>
        </CodeEditor>
    );
}

export function Preview({
    filePath,
    mdxSource,
    language,
    scope,
    noInline,
    children
}) {
    if (!isNil(filePath)) {
        return (
            <FilePreview
                filePath={filePath}
                language={language}
                scope={scope}
                noInline={noInline}
            />
        );
    }

    if (!isNil(mdxSource)) {
        return (
            <MdxSourcePreview
                mdxSource={mdxSource}
                language={language}
                scope={scope}
                noInline={noInline}
            />
        );
    }

    return (
        <StoryPreview
            language={language}
            scope={scope}
            noInline={noInline}
        >
            {children}
        </StoryPreview>
    );
}

Preview.propTypes = propTypes;
