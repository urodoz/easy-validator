var _ = require("underscore");

module.exports = {
    validate: function (violations, assertItem, propertyPath, value, validatorFactory) {
        if(_.isNull(value)) {
            violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be not null", value));
        }
        
        //Extract type (or default "string")
        var type = "string";
        //For strings
        if(_.isString(assertItem)) {
            var matchType = assertItem.match(/^@Assert:Type\(\"([a-z]+)\"\)$/);
            if(_.isArray(matchType) && (matchType.length>0)) {
                type = matchType[1];
            }    
        }
        //For objects
        if(_.isObject(assertItem) && _.has(assertItem, 'type')) {
            type = assertItem.type;
        }
        
        switch (type) {
            case 'string':
                if(!_.isString(value)) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be string", value));
                }
                break;
            case 'array':
                if(!_.isArray(value)) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be array", value));
                }
                break;
            case 'object':
                if(!_.isObject(value) || _.isArray(value)) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be object", value));
                }
                break;
            case 'boolean':
                if(!_.isBoolean(value)) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be boolean", value));
                }
                break;
            case 'numeric':
                if(!_.isNumber(value)) {
                    violations.push(validatorFactory(propertyPath, "This value {{value}} is expected to be numeric", value));
                }
                break;
            default:
                violations.push(validatorFactory(propertyPath, "Type '"+type+"' not supported on validation", value));
                break;
        }
    }
};
