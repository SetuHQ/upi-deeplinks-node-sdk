// Required libraries
const axios = require('axios').default;

// Required helpers
const authHelper = require('./auth');

// Export object
var requestHelper = {};

// GET helper
requestHelper.get = (url, secrets, platformBillId) => {
    return axios
        .get(
            `${url}/${platformBillId}`,
            authHelper.generateRequiredHeaders(
                secrets.schemeId,
                secrets.jwtSecret,
                secrets.setuProductInstanceId
            )
        )
        .then(({ response }) => response.data)
        .catch(({ response }) => response.data);
};

// POST helper
requestHelper.post = (url, secrets, body) => {
    return axios
        .post(
            url,
            body,
            authHelper.generateRequiredHeaders(
                secrets.schemeId,
                secrets.jwtSecret,
                secrets.setuProductInstanceId
            )
        )
        .then(({ response }) => response.data)
        .catch(({ response }) => response.data);
};

module.exports = requestHelper;
