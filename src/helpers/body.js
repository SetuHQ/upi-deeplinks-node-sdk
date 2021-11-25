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
    settlement,
    validationRules,
    transactionNote,
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
    body = commonHelper.addIfExists('settlement', settlement, body);
    body = commonHelper.addIfExists('validationRules', validationRules, body);
    body = commonHelper.addIfExists('transactionNote', transactionNote, body);
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
