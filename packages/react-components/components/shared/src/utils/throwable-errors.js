import { isNullOrEmpty } from "./types";

class ExtendableError extends Error {
    message = "";
    name = "";
    stack = null;

    constructor(message) {
        super();

        this.message = message;
        this.name = this.constructor.name;
        this.stack = new Error(message).stack;
    }
}

export class ArgumentError extends ExtendableError {
    /**
     * @param {string} errorMessage
     */
    constructor(errorMessage) {
        const message = isNullOrEmpty(errorMessage) ? "ArgumentError" : `ArgumentError: "${errorMessage}"`;

        super(message);
    }
}

export class ArgumentNullError extends ExtendableError {
    /**
     * @param {string} parameterName
     * @param {string} errorMessage
     */
    constructor(parameterName, errorMessage) {
        let message = "";

        if (isNullOrEmpty(parameterName) && isNullOrEmpty(errorMessage)) {
            message = "ArgumentNullError";
        } else if (isNullOrEmpty(errorMessage)) {
            message = `ArgumentNullError: "${parameterName}" cannot be null`;
        } else {
            message = `ArgumentNullError: "${errorMessage}"`;
        }

        super(message);

        this.parameterName = parameterName;
    }
}

export class InvalidOperationError extends ExtendableError {
    /**
     * @param {string} errorMessage
     */
    constructor(errorMessage) {
        const message = isNullOrEmpty(errorMessage) ? "InvalidOperationError" : `InvalidOperationError: "${errorMessage}"`;

        super(message);
    }
}
