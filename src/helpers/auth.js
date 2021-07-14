// Required libraries
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const axios = require('axios').default;

const generateJWT = (schemeId, jwtSecret) => {
    return jwt.sign(
        {
            aud: schemeId,
            iat: Math.floor(Date.now / 1000),
            jti: uuid.v4()
        },
        jwtSecret
    );
};

async function generateOAuth(schemeId, jwtSecret,url) {
    url = url + "/auth/token"
    const headers = {
        'Content-Type': 'application/json',
    }
    const payload = {
        "clientID": schemeId,
        "secret": jwtSecret,
    }
    try {
        const {data} = await axios.post(url,payload,headers);
        return data.data.token;
    } catch (error) {
        throw error;
    }
}

var authHelper = {};

authHelper.generateRequiredHeaders = async (
    schemeId,
    jwtSecret,
    setuProductInstanceId,
    setuBaseUrl,
    authType="JWT"
) => {
    const token = authType =="JWT" ? generateJWT(schemeId, jwtSecret): await  generateOAuth(schemeId,jwtSecret,setuBaseUrl)
    return {
        headers: {
            Authorization: 'Bearer ' + token,
            'X-Setu-Product-Instance-ID': setuProductInstanceId
        }
    };
};

module.exports = authHelper;
