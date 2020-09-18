export function omitProps(obj, props) {
    return Object.keys(obj).reduce((acc, x) => {
        if (!props.includes(x)) {
            acc[x] = obj[x];
        }

        return acc;
    }, {});
}
