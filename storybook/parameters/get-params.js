const DEFAULT_PARAMETERS = {
    showBrandPicker: true
};

export function getParametersFromContext({ parameters }) {
    return {
        ...DEFAULT_PARAMETERS,
        ...parameters
    };
}
