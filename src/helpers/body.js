// Required libraries
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

// Required settings
dayjs.extend(utc);

var bodyHelper = {};

bodyHelper.createPaymentLink = ({
    amountValue,
    billerBillID,
    payeeName,
    expiresInDays,
    amountExactness,
    settlementObject = null,
    validationRulesObject = null
}) => {
    let dueAndExpiryDate = dayjs().add(expiresInDays, 'day');
    dueAndExpiryDate = dueAndExpiryDate.utc().format();

    let body = {
        amount: {
            currencyCode: 'INR',
            value: amountValue
        },
        amountExactness: amountExactness || 'EXACT',
        billerBillID: billerBillID,
        dueDate: dueAndExpiryDate,
        expiryDate: dueAndExpiryDate,
        name: payeeName
    };

    if (!settlementObject) {
        body.settlement = settlementObject;
    }

    if (!validationRulesObject) {
        body.validationRules = validationRulesObject;
    }

    return body;
};

bodyHelper.triggerMockPayment = ({ amountValue, upiId }) => {
    return {
        amount: amountValue,
        destinationAccount: {
            accountID: upiId
        },
        sourceAccount: {
            accountID: 'customer@vpa'
        },
        type: 'UPI'
    };
};

module.exports = bodyHelper;
