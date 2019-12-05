/* eslint react/jsx-filename-extension: "off" */

import { BRANDS, getCurrentBrand } from "../brands";
import { CanvasContainer, DocsContainer as OrbitDocsContainer } from "../containers";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorySort } from "./sort-stories";
import { customStorybookTheme } from "./theme";
import { includeChromatic, includeComponents, includeIntroduction, includeMaterials, includeSemanticTheme, includeStories, isChromatic, isDocs } from "../env";
import { withConsole } from "@storybook/addon-console";

import "@orbit-ui/css-normalize";
import "@orbit-ui/icons";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";
import "@orbit-ui/tachyons/dist/desktop.css";
import "@orbit-ui/tachyons/dist/overcast.css";

if (!isChromatic) {
    // Custom font makes chromatic inconsistent and cause "false positive".
    import("@orbit-ui/fonts");

    const currentBrandId = getCurrentBrand().id;

    // This is very ugly but I can't figure out how to do a dynamic import with a dynamic expression.
    // Ex. import(BRANDS.apricot.stylesheet);
    if (currentBrandId === BRANDS.apricot.id) {
        import("@orbit-ui/foundation/dist/overcast.css");
        import("@orbit-ui/foundation/dist/desktop.css");
        import("@orbit-ui/foundation/dist/apricot.css");
    } else if (currentBrandId === BRANDS.overcast.id) {
        import("@orbit-ui/foundation/dist/apricot.css");
        import("@orbit-ui/foundation/dist/desktop.css");
        import("@orbit-ui/foundation/dist/overcast.css");
    } else if (currentBrandId === BRANDS.desktop.id) {
        import("@orbit-ui/foundation/dist/apricot.css");
        import("@orbit-ui/foundation/dist/overcast.css");
        import("@orbit-ui/foundation/dist/desktop.css");
    }
} else {
    // The custom brand picker cause a rendering delay that we don't want to handle in the stories since
    // chromatic execution will take too long. To circonvent this problem, we only load the apricot brand.
    import("@orbit-ui/foundation/dist/apricot.css");
}

import "../styles/docs.css";
import "../styles/preview-iframe.css";
import "../styles/stories.css";

addParameters({
    options: {
        theme: customStorybookTheme,
        storySort: customStorySort
    },
    docs: {
        inlineStories: true,
        container: ({ children, context }) => (
            <DocsContainer context={context}>
                <OrbitDocsContainer context={context}>
                    {children}
                </OrbitDocsContainer>
            </DocsContainer>
        )
    }
});

if (!isDocs) {
    addDecorator((storyFn, context) => withConsole()(storyFn)(context));
    addDecorator((storyFn, context) => <CanvasContainer story={storyFn()} context={context} />);
}

let stories = [];

if (includeIntroduction) {
    if (includeStories) {
        stories = [...stories, require.context("../stories/introduction", true, /.stories.mdx$/)];
    }
}

if (includeMaterials) {
    if (includeStories) {
        stories = [...stories, require.context("../stories/materials", true, /.stories.mdx$/)];
    }

    if (includeChromatic) {
        stories = [...stories, require.context("../stories/materials", true, /.chroma.jsx$/)];

    }
}

if (includeComponents) {
    if (includeStories) {
        stories = [
            ...stories,
            require.context("../../packages/react-components/components", true, /.stories.mdx$/),
            require.context("../stories/semantic-ui/react", true, /.stories.mdx$/)
        ];
    }

    if (includeChromatic) {
        stories = [
            ...stories,
            require.context("../../packages/react-components/components", true, /.chroma.jsx$/),
            require.context("../stories/semantic-ui/react", true, /.chroma.jsx$/)
        ];
    }
}

if (includeSemanticTheme) {
    if (includeStories) {
        stories = [...stories, require.context("../stories/semantic-ui/theme", true, /.stories.mdx$/)];
    }

    if (includeChromatic) {
        stories = [...stories, require.context("../stories/semantic-ui/theme", true, /.chroma.jsx$/)];
    }
}

configure(stories, module);
