var assert = require("assert");

describe('Index require', function() {
    
    it('Require index should return the eValidator base object', function(done){
        var eValidator = require('./../index.js');
        assert.ok(typeof(eValidator.Assert)!="undefined");
        done();
    });
    
});