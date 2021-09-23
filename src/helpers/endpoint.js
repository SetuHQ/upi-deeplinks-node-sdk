const productionUrl = 'https://prod.setu.co/api';
const sandboxUrl = 'https://uat.setu.co/api';

module.exports = {
    endpointHelper: (mode = 'SANDBOX', version2 = false) => {
        let url = null;

        if (mode === 'PRODUCTION') url = productionUrl;
        else url = sandboxUrl;
        if (version2) url = url + '/v2';
        return {
            'baseUrl': url,
            'reports': url + '/reports',
            'payment-link': url + '/payment-links',
            'mock-payment': url + '/triggers/funds/addCredit',
            'retreive-reports': url + '/reports',
            'bill-expiry': url + '/utilities/bills',
        };
    }
};
