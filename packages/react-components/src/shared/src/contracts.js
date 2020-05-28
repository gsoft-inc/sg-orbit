import { ArgumentError, ArgumentNullError } from "./throwable-errors";
import { IS_PRODUCTION } from "./env";
import { forOwn, isArray, isFunction, isInteger, isNil, isObject, isPlainObject, isString } from "lodash";
import { isNullOrEmpty } from "./types";
import { template } from "./string";

const ASSERTION_DEFINITIONS = {
    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isNotNull("Optional specific message");
     */
    isNotNull: (parameter, parameterName, context, assertionMessage) => {
        if (isNil(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} cannot be null.`, parameterName, context);

            throw new ArgumentNullError(parameterName, message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isNotEmpty("Optional specific message");
     */
    isNotEmpty: (parameter, parameterName, context, assertionMessage) => {
        let isValid = false;

        if (!isNil(parameter)) {
            isValid = true;
        } else if (isArray(parameter)) {
            isValid = parameter.length > 0;
        } else {
            isValid = parameter !== "";
        }

        if (!isValid) {
            const message = getMessage(assertionMessage, template`${0}${1} cannot be empty.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isNotNullOrEmpty("Optional specific message");
     */
    isNotNullOrEmpty: (parameter, parameterName, context, assertionMessage) => {
        let message = "";

        if (isNil(parameter)) {
            message = getMessage(assertionMessage, template`${0}${1} cannot be null.`, parameterName, context);

            throw new ArgumentNullError(parameterName, message);
        }

        if (parameter === "") {
            message = getMessage(assertionMessage, template`${0}${1} cannot be empty.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isFunction("Optional specific message");
     */
    isFunction: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isFunction(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a function.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isString("Optional specific message");
     */
    isString: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isString(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a string.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isArray("Optional specific message");
     */
    isArray: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isArray(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an array.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isObject("Optional specific message");
     */
    isObject: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isObject(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an object.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isPlainObject("Optional specific message");
     */
    isPlainObject: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isPlainObject(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a plain object.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isNumber("Optional specific message");
     */
    isNumber: (parameter, parameterName, context, assertionMessage) => {
        if (!isNil(parameter) && !isInteger(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a number.`, parameterName, context);

            throw new ArgumentError(message);
        }
    },

    /**
     * @example
     * ensure(parameter, "Optional parameter name", "Optional context").isTrue(// Can be a boolean or a function // () => { return true; }, "Optional specific message");
     */
    isTrue: (parameter, parameterName, context, evaluator, assertionMessage) => {
        let fct = evaluator;

        if (!isFunction(evaluator)) {
            fct = x => {
                return !!x;
            };
        }

        if (!isNil(parameter) && !fct(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} is invalid.`, parameterName, context);

            throw new ArgumentError(message);
        }
    }
};

function getMessage(assertionMessage, defaultMessageTemplate, parameterName, context) {
    let message = assertionMessage;

    if (isNullOrEmpty(message)) {
        const param1 = isNullOrEmpty(context) ? "" : `${context} - `;
        const param2 = isNullOrEmpty(parameterName) ? "Parameter" : parameterName;

        message = defaultMessageTemplate(param1, param2);
    }

    return message;
}

/**
 * Ensure that a parameter respect the specified assertions.
 * @param {string} parameter - The parameter to verify.
 * @param {string} parameterName - The name of the parameter to verify.
 * @param {string} [context] - An identifier providing more information about the context of the call to ensure.
 * @return {Object} An object that contains all the assertions functions.
 * @example
 * ensure(parameter, "Optional parameter name", "Optional context")
 *      .isNotNull("Optional specific message")
 *      .isNotEmpty("Optional specific message")
 *      .isString("Optional specific message");
 */
export function ensure(parameter, parameterName, context) {
    const assertions = {};

    const getAssertionProxy = assertion => {
        return (...args) => {
            if (!IS_PRODUCTION) {
                assertion(parameter, parameterName, context, ...args);
            }

            return assertions;
        };
    };

    // Wrap all the assertions to append the default arguments to the function arguments.
    forOwn(ASSERTION_DEFINITIONS, (assertion, assertionKey) => {
        assertions[assertionKey] = getAssertionProxy(assertion);
    });

    return assertions;
}
