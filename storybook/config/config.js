/* eslint react/jsx-filename-extension: "off" */

import { BRANDS, getCurrentBrand } from "@shared/brands";
import { CanvasContainer } from "@decorators/canvas-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorySort } from "./sort-stories";
import { customStorybookTheme } from "./theme";
import { includeChromatic, includeStories, isChromatic, isDocs, printEnvironment } from "../shared/env";

import "@orbit-ui/css-normalize";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";
import "@orbit-ui/tachyons/dist/desktop.css";
import "@orbit-ui/tachyons/dist/overcast.css";

printEnvironment();

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

import "@orbit-ui/react-components/dist/index.css";

import "./styles/app.css";
import "./styles/docs.css";
import "./styles/stories.css";

if (!isDocs) {
    addDecorator((storyFn, context) => <CanvasContainer story={storyFn()} context={context} />);
}

addParameters({
    options: {
        theme: customStorybookTheme,
        storySort: customStorySort
    },
    docs: {
        inlineStories: true
    }
});

let stories = [];

if (includeStories) {
    stories = [
        ...stories,
        require.context("../stories/getting-started", true, /.stories.mdx$/),
        require.context("../stories/materials", true, /.stories.mdx$/),
        require.context("../../packages/icons/stories", true, /.stories.mdx$/),
        require.context("../../packages/react-components/src", true, /.stories.mdx$/)
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        require.context("../stories/materials", true, /.chroma.jsx$/),
        require.context("../../packages/react-components/src", true, /.chroma.jsx$/),
        require.context("../stories/semantic-ui", true, /.chroma.jsx$/)
    ];
}

configure(stories, module);
