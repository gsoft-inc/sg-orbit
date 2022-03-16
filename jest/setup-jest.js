global.ResizeObserver = require("resize-observer-polyfill");

const ERROR_PATTERNS_WE_SHOULD_FIX_BUT_ALLOW = [];
const WARNING_PATTERNS_WE_SHOULD_FIX_BUT_ALLOW = [];

function failTestOnConsoleError() {
    const error = console.error;

    console.error = function (message) {
        const allowedPattern = ERROR_PATTERNS_WE_SHOULD_FIX_BUT_ALLOW.find(pattern => message.indexOf(pattern) > -1);

        if (allowedPattern) {
            return;
        }

        error.apply(console, arguments);
        throw message instanceof Error ? message : new Error(message);
    };
}

function failTestOnConsoleWarn() {
    const warn = console.warn;

    console.warn = function (message) {
        const allowedPattern = WARNING_PATTERNS_WE_SHOULD_FIX_BUT_ALLOW.find(pattern => message.indexOf(pattern) > -1);

        if (allowedPattern) {
            return;
        }

        warn.apply(console, arguments);
        throw message instanceof Error ? message : new Error(message);
    };
}

failTestOnConsoleWarn();
failTestOnConsoleError();
