// Required libraries
const axios = require('axios').default;

// Required helpers
const authHelper = require('./auth');

// Export object
var requestHelper = {};

// GET helper
requestHelper.get = async (url, secrets, platformBillId) => {
    try {
        let { data } = await axios.get(
            `${url}/${platformBillId}`,
            authHelper.generateRequiredHeaders(
                secrets.schemeId,
                secrets.jwtSecret,
                secrets.setuProductInstanceId
            )
        );
        return data;
    } catch ({ response }) {
        return response.data;
    }
};

// POST helper
requestHelper.post = async (url, secrets, body) => {
    try {
        let { data } = await axios.post(
            url,
            body,
            authHelper.generateRequiredHeaders(
                secrets.schemeId,
                secrets.jwtSecret,
                secrets.setuProductInstanceId
            )
        );

        return data;
    } catch ({ response }) {
        return response.data;
    }
};

module.exports = requestHelper;
