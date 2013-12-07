var _ = require("underscore");

module.exports = {
    validate: function (violations, assertItem, propertyPath, value, validatorFactory) {
        if(_.isNull(value) || !_.isString(value)) {
            violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be a string", value));
        }
        //Validating email
        if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be a valid email", value));
        }
    }
};
