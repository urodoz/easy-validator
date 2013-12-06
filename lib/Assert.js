module.exports = function(constraintDefinition) {
    
    var validator = require('./Validator.js');
    validator.setConstraintDefinition(constraintDefinition);
    
    var validatorObject = {
        perform: validator
    };

    
    
    return validatorObject;
    
};