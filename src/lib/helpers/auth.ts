import axios from "axios";
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

import { getURLPath } from "./endpoint";
import { API, FetchTokenResponseData, SetuEnv, SetuResponseBase } from "./types";

export const getOAuthToken = async (mode: `${SetuEnv}`, clientID: string, secret: string): Promise<string> => {
    const { data } = await axios.post<SetuResponseBase<FetchTokenResponseData>>(
        getURLPath(mode, "OAUTH", API.FETCH_TOKEN),
        { clientID, secret: secret }
    );
    return `Bearer ${data.data.token}`;
};

export const getJWTToken = (schemeId: string, jwtSecret: string) => {
    return `Bearer ${jwt.sign(
        {
            aud: schemeId,
            iat: Math.floor(Date.now() / 1000),
            jti: uuidV4(),
        },
        jwtSecret
    )}`;
};
