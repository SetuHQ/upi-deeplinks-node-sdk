const commonHelper = {};

commonHelper.addIfExists = (name, value, body) => {
    if (value && name) {
        const temp = {};
        temp[name] = value;
        return { ...body, ...temp };
    } 
    return body;
};

module.exports = commonHelper;
