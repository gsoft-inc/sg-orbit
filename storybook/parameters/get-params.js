const DEFAULT_PARAMETERS = {
    sortPriority: 0,
    showBrandPicker: true
};

export function getParameters({ parameters }) {
    return {
        ...DEFAULT_PARAMETERS,
        ...parameters
    };
}
