import test from "ava";
import jwt, { JwtPayload } from "jsonwebtoken";

import { getJWTToken, getOAuthToken } from "./auth";

const v1Creds = {
    schemeID: "5bf4376b-6008-43c8-8ce0-a5ea196e3091",
    secret: "9975fd99-d5ed-416a-9963-5d113dc80582",
};

const v2Creds = {
    clientID: "c4f57443-dc1e-428f-8c4e-e5fd531057d2",
    secret: "5b288618-473f-4193-ae1b-8c42f223798e",
};

test("getOAuthToken", async (t) => {
    const token = await getOAuthToken("SANDBOX", v2Creds.clientID, v2Creds.secret);
    const decodedJWT = jwt.decode(token.replace("Bearer ", "")) as JwtPayload;
    t.is(decodedJWT["clientId"], v2Creds.clientID);
});

test("getJWTToken", (t) => {
    const token = getJWTToken(v1Creds.schemeID, v1Creds.secret);
    jwt.verify(token.replace("Bearer ", ""), v1Creds.secret);
    t.pass();
});
