import { DocsContainer } from "@storybook/addon-docs/blocks";
import { isNil, merge } from "lodash";

class DocsParamsBuilder {
    _container = null;
    _exclude = false;

    container(container) {
        if (!isNil(container)) {
            this._container = container;
        }

        return this;
    }

    exclude() {
        this._exclude = true;

        return this;
    }

    build() {
        let params = {};

        if (!isNil(this._container)) {
            params = merge(params, {
                container: ({ children, context }) => {
                    const CustomContainer = this._container;

                    return (
                        <DocsContainer context={context}>
                            <CustomContainer context={context}>
                                {children}
                            </CustomContainer>
                        </DocsContainer>
                    );
                }
            });
        }

        if (this._exclude) {
            params = merge(params, {
                disable: true
            });
        }

        return Object.keys(params).length > 0
            ? { docs: params }
            : {};
    }
}

export function docsParams() {
    return new DocsParamsBuilder();
}
