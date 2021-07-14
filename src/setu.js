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
        this.secrets.authType = data.authType || "JWT"; // OAuth // JWT
        this.secrets.setuProductInstanceId = data.setuProductInstanceId || null;
        this.mode = data.mode || 'SANDBOX';
        const version2 = this.secrets.authType != 'JWT';
        this.endpoints = endpointHelper(data.mode,version2);
        this.secrets.setuBaseUrl = this.endpoints['baseUrl'];
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


const prid = "673421395987793445";
const clid = '94d5273d-cc52-4410-abfc-e307fb9af709';
const sec = '215f4044-eaf3-49b0-9425-3fd13429dfc3';

async function test(){
    let setu = new Setu({
        schemeId: clid,
        jwtSecret: sec,
        setuProductInstanceId: prid,
        mode: "SANDBOX"
    });
    
    let paymentLinkBody = {
        "amountValue":100,
        "billerBillID": "abc",
        "amountExactness": "ANY"
    };
    let mockPayment = {
        "amountValue":89,
        "upiId": "setu673872470574368369@kaypay",
        "amountExactness": "ANY"
    };
    // let data = await setu.triggerMockPayment(mockPayment);
    // let data = await setu.checkPaymentStatus("673872823340500596");
    let reportData = {
        "pagination": {
            "cursor": "",
            "limit": 100
        },
        "productIds": [
            "673421395987793445"
        ],
        "productInstanceIDOfReport":"673421395987793445"
    }
    let data = await setu.retreiveReports(reportData);
    
    console.log("data",data);
}
test();

// module.exports = Setu;s
