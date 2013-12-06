var _ = require("underscore");

module.exports = {
    validate: function (violations, assertItem, propertyPath, value, validatorFactory) {
        if(!_.isNull(value)) {
            violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be null", value));
        }
    }
};
