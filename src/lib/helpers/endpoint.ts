import { API, AuthScheme, SetuEnv } from "./types";

const SANDBOX_BASE = "https://uat.setu.co/api";
const PRODUCTION_BASE = "https://prod.setu.co/api";

export const getURLPath = (env: `${SetuEnv}`, authType: `${AuthScheme}`, endpoint: API) => {
    return `${env === SetuEnv.SANDBOX ? SANDBOX_BASE : PRODUCTION_BASE}${authType === "OAUTH" ? "/v2" : ""}${endpoint}`;
};
