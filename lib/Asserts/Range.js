var _ = require("underscore");

module.exports = {
    validate: function (violations, assertItem, propertyPath, value, validatorFactory) {
        var self = this;
        
        if(!_.isNumber(value)) {
            violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be a number", value));
        }
         
        //For strings
        if(_.isString(assertItem)) {
            //MIN
            var matchMin = assertItem.match(/^.*\(.*min=([0-9]+).*\).*$/);
            if(_.isArray(matchMin) && (matchMin.length>0)) {
                var min = parseInt(matchMin[1]);
                if(value<min) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is smaller than minimun value " + min, value));
                }
            }    
            //MAX
            var matchMax = assertItem.match(/^.*\(.*max=([0-9]+).*\).*$/);
            if(_.isArray(matchMax) && (matchMax.length>0)) {
                var max = parseInt(matchMax[1]);
                if(value>max) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is greater than maximum value " + max, value));
                }
            }
        }
        
        //For objects
        if(_.isObject(assertItem)) {
            if(_.has(assertItem, 'min')) {
                var min = parseInt(assertItem.min);
                if(value<min) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is smaller than minimun value " + min, value));
                }
            }
            if(_.has(assertItem, 'max')) {
                var max = parseInt(assertItem.max);
                if(value>max) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is greater than maximum value " + min, value));
                }
            }
        }
    }
};
