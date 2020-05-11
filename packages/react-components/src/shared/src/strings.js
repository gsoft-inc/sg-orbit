/**
 * Tagged template literals that create a dynamic string template.
 * For more informations view https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals.
 * @param {string} strings - The template.
 * @param {...string} key - The interpolation keys.
 * @return {function} A function that accept the dynamic values and return the formatted string.
 * @example
 * function log(messageTemplate) {
 *     console.log(messageTemplate("John"));
 * }
 *
 * log(template`Hello ${0}!`); -> // Hello John!
 */
export function template(strings, ...keys) {
    return function(...values) {
        const result = [strings[0]];

        keys.forEach((key, i) => {
            result.push(values[key], strings[i + 1]);
        });

        return result.join("");
    };
}
