// Required libraries
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const generateJWT = (schemeId, jwtSecret) => {
    return jwt.sign(
        {
            aud: schemeId,
            iat: Math.floor(Date.now() / 1000),
            jti: uuid.v4()
        },
        jwtSecret
    );
};

var authHelper = {};

authHelper.generateRequiredHeaders = (
    schemeId,
    jwtSecret,
    setuProductInstanceId
) => {
    return {
        headers: {
            Authorization: 'Bearer ' + generateJWT(schemeId, jwtSecret),
            'X-Setu-Product-Instance-ID': setuProductInstanceId
        }
    };
};

module.exports = authHelper;
