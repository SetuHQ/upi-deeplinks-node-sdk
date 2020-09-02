var commonHelper = {};

commonHelper.addIfExists = (name, value, body) => {
    if (value && name) {
        let temp = {};
        temp[name] = value;
        return { ...body, ...temp };
    } else return body;
};

module.exports = commonHelper;
