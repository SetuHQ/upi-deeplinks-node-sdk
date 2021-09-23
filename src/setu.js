// Required helpers
const bodyHelper = require('./helpers/body');
const requestHelper = require('./helpers/request');
const { endpointHelper } = require('./helpers/endpoint');

class Setu {

    constructor(data) {
        this.secrets = {};
        this.endpoints = {};

        this.secrets.schemeId = data.schemeId || null;
        this.secrets.jwtSecret = data.jwtSecret || null;
        this.secrets.setuProductInstanceId = data.setuProductInstanceId || null;
        this.mode = data.mode || 'SANDBOX';
        this.endpoints = endpointHelper(data.mode);
    }

    sayHi() {
      console.log('Setu says Hi!');
    }

    checkIfValuesExist() {
        if (
            !this.secrets.schemeId ||
            !this.secrets.jwtSecret ||
            !this.secrets.setuProductInstanceId
        ) {
            return false;
        } else {
            return true;
        }
    };

    displaySetValues() {
        if (this.checkIfValuesExist()) {
            console.info(JSON.stringify({...this.secrets, ...this.endpoints}));
        } else {
            console.info('Required values are not set');
        }
    };

    createPaymentLink(body) {
        if (this.checkIfValuesExist()) {
            return requestHelper.post(
                this.endpoints['payment-link'],
                this.secrets,
                bodyHelper.createPaymentLink(body)
            );
        }
    };

    setBillExpiry(platformBillID=null) {
        if (this.checkIfValuesExist() && !!platformBillID) {
            return requestHelper.post(
                this.endpoints['bill-expiry'] + `/${platformBillID}/expire`,
                this.secrets
            );
        }
    };

    checkPaymentStatus(platformBillID = null) {
        if (this.checkIfValuesExist() && !!platformBillID) {
            return requestHelper.get(
                this.endpoints['payment-link'],
                this.secrets,
                platformBillID
            );
        }
    };

    triggerMockPayment(body) {
        if (this.checkIfValuesExist() && this.mode === 'SANDBOX') {
            return requestHelper.post(
                this.endpoints['mock-payment'],
                this.secrets,
                bodyHelper.triggerMockPayment(body)
            );
        }
    };

    retreiveReports(body) {
        if (this.checkIfValuesExist()) {
            return requestHelper.post(
                this.endpoints['retreive-reports'],
                this.secrets,
                body
            );
        }
    };
}

module.exports = Setu;
