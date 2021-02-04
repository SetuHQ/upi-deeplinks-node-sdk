const productionUrl = 'https://prod.setu.co/api';
const sandboxUrl = 'https://uat.setu.co/api';

module.exports = {
    endpointHelper: (mode = 'SANDBOX') => {
        let url = null;

        if (mode === 'PRODUCTION') url = productionUrl;
        else url = sandboxUrl;

        return {
            reports: url + '/reports',
            'payment-link': url + '/payment-links',
            'mock-payment': url + '/triggers/funds/addCredit',
            'retreive-reports': url + '/reports'
        };
    }
};
