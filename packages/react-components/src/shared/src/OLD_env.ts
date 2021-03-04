export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === "staging" || ENVIRONMENT === "production";
export const IS_DEBUG = !IS_PRODUCTION;
