// Required helpers
const commonHelper = require('./common');

var bodyHelper = {};

bodyHelper.createPaymentLink = ({
    amountValue,
    billerBillID,
    payeeName,
    dueDate,
    expiryDate,
    amountExactness,
    settlementObject = null,
    validationRulesObject = null
}) => {
    let body = {
        amount: {
            currencyCode: 'INR',
            value: amountValue
        },
        amountExactness: amountExactness,
        billerBillID: billerBillID
    };

    body = commonHelper.addIfExists('dueDate', dueDate, body);
    body = commonHelper.addIfExists('expiryDate', expiryDate, body);
    body = commonHelper.addIfExists('payeeName', payeeName, body);
    body = commonHelper.addIfExists('settlement', settlementObject, body);
    body = commonHelper.addIfExists(
        'validationRules',
        validationRulesObject,
        body
    );

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
