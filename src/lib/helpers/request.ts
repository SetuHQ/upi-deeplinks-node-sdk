import axios, { AxiosError, AxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { SetuError } from "../types";

import { getJWTToken, getOAuthToken } from "./auth";
import { API, SetuResponseBase, SetuUPIDeepLinkParams } from "./types";

const genericSetuError: SetuError = {
    code: "unknown-error",
    detail: "Something went wrong. Please try again in sometime.",
    docURL: "",
    title: "Unknown error",
    errors: [],
    traceID: "",
};

export const setuErrorHandler = (error: AxiosError<SetuResponseBase<unknown>>) => {
    if (error.response && !(error.response.status === 401 || error.response.status === 403)) {
        return Promise.reject(error.response.data.error);
    } else {
        return Promise.reject(genericSetuError);
    }
};

export const getAxiosInstance = (params: SetuUPIDeepLinkParams) => {
    // eslint-disable-next-line functional/no-let
    let token = "";

    const collectAxiosInstance = axios.create({
        headers: {
            "X-Setu-Product-Instance-ID": params.productInstanceID,
        },
    });

    collectAxiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
        if (params.authType === "JWT") {
            token = getJWTToken(params.schemeID, params.secret);
        } else if (token === "" && config.url && !config.url.endsWith(API.FETCH_TOKEN)) {
            token = await getOAuthToken(params.mode, params.schemeID, params.secret);
        }

        return {
            ...config,
            headers: { ...config.headers, Authorization: token },
        };
    });

    const refreshAuth = async (failedRequest: AxiosError): Promise<string> => {
        token = await getOAuthToken(params.mode, params.schemeID, params.secret);

        if (failedRequest.response) {
            // eslint-disable-next-line functional/immutable-data
            failedRequest.response.config.headers = {
                ...failedRequest.response.config.headers,
                Authorization: token,
            };
        }

        return token;
    };

    if (params.authType === "OAUTH") {
        // TODO: What happens in case of 403 due to actual lack of access?
        createAuthRefreshInterceptor(collectAxiosInstance, refreshAuth, {
            statusCodes: [401, 403],
        });
    }

    return collectAxiosInstance;
};
