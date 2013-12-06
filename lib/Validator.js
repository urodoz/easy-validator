var _ = require("underscore");

//Validators
var notnullValidator = require('./Asserts/NotNull.js');
var nullValidator = require('./Asserts/Null.js');
var typeValidator = require('./Asserts/Type.js');

function factoryViolation(propertyPath, message, value)
{
    return {
        propertyPath: propertyPath,
        message: message
    };
};

module.exports = {
    
    constraintDefinition: null,
    
    validate: function(valueObject) {
        var violations = [];

        //Looping through the keys of the constraint definition
        var cKeys = _.keys(this.constraintDefinition);
        var self = this;

        _.each(cKeys, function(cKey){
            var assertList = self.constraintDefinition[cKey];
            
            //Perform the validation
            var value = null;
            if(typeof(valueObject[cKey])!="undefined") {
                value = valueObject[cKey];
            }
            
            _.each(assertList, function(assertItem) {
                if (/^@Assert:NotNull\(.*\)$/.test(assertItem)) {
                    notnullValidator.validate(violations, assertItem, cKey, value, factoryViolation);
                }
                if (/^@Assert:Type\(.*\)$/.test(assertItem)) {
                    typeValidator.validate(violations, assertItem, cKey, value, factoryViolation);
                }
                if (/^@Assert:Null\(.*\)$/.test(assertItem)) {
                    nullValidator.validate(violations, assertItem, cKey, value, factoryViolation);
                }
            });
            
        });

        //Returning volations or null
        if(violations.length===0) return null;
        return violations;
    },
    
    setConstraintDefinition: function(constraintDefinition) {
        this.constraintDefinition = constraintDefinition;
    }
    
};