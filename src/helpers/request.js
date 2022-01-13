// Required libraries
const axios = require('axios').default;

// Required helpers
const authHelper = require('./auth');

// Export object
const requestHelper = {};

// GET helper
requestHelper.get = async (url, secrets, platformBillId) => {
    try {
        const {headers} = await authHelper.generateRequiredHeaders(
            secrets.schemeId,
            secrets.jwtSecret,
            secrets.setuProductInstanceId,
            secrets.setuBaseUrl,
            secrets.authType
        );
        const config = {
            method: 'get',
            url: `${url}/${platformBillId}`,
            headers: headers
        };
        const { data } = await axios(config);
        return data;
    } catch ({ response }) {
        return response.data;
    }
};

// POST helper
requestHelper.post = async (url, secrets, body) => {
    try {
        const { headers } = await authHelper.generateRequiredHeaders(
            secrets.schemeId,
            secrets.jwtSecret,
            secrets.setuProductInstanceId,
            secrets.setuBaseUrl,
            secrets.authType
        );
        const config = {
            method: 'post',
            url: url,
            headers: headers,
            data: body
        };
        const { data } = await axios(config);
        return data;
    } catch ({ response }) {
        return response.data;
    }
};

module.exports = requestHelper;
