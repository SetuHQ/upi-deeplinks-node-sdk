// Required libraries
const axios = require('axios').default;

// Required helpers
const authHelper = require('./auth');

// Export object
var requestHelper = {};

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
        var config = {
            method: 'get',
            url: `${url}/${platformBillId}`,
            headers: headers
        };
        let { data } = await axios(config);
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
        var config = {
            method: 'post',
            url: url,
            headers: headers,
            data: body
        };
        let { data } = await axios(config);
        return data;
    } catch ({ response }) {
        return response.data;
    }
};

module.exports = requestHelper;
