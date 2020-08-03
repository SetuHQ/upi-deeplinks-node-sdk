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
    amountExactness
}) => {
    let dueAndExpiryDate = dayjs().add(expiresInDays, 'day');
    dueAndExpiryDate = dueAndExpiryDate.utc().format();

    return {
        amount: {
            currencyCode: 'INR',
            value: amountValue / 100
        },
        amountExactness: amountExactness || 'EXACT',
        billerBillID: billerBillID,
        dueDate: dueAndExpiryDate,
        expiryDate: dueAndExpiryDate,
        name: payeeName
    };
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
