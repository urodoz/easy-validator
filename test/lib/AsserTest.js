var assert = require("assert");
var _ = require("underscore");
var eValidator = require('./../../index.js');

describe('Assert:Type validations', function() {
    
    it('Type string only is validated agains type=string', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Type("string")']
        })
        
        violationList = constraintCollection.perform.validate({})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:null})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:"string"})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({name:123})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:9.99})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:[]})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        //Using default setup of annotation
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Type("string")']
        })
        
        violationList = constraintCollection.perform.validate({})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:null})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:"string"})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({name:123})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:9.99})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:[]})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        done();
    });
    
    it('Type numeric only is validated agains type=numeric', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Type("numeric")']
        })
        
        violationList = constraintCollection.perform.validate({})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:null})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:123})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({name:"123"})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:9.99})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({name:[]})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        done();
    });
    
    it('Type array only is validated agains type=array', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Type("array")']
        })
        
        violationList = constraintCollection.perform.validate({})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:null})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:123})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:"123"})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:9.99})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:[]})
        assert.ok(_.isNull(violationList));
        
        done();
    });
    
    it('Type object only is validated agains type=object', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Type("object")']
        })
        
        violationList = constraintCollection.perform.validate({name:{}})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({name:null})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:123})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:"123"})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:9.99})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({name:[]})
        assert.ok(violationList);
        assert.ok(0<violationList.length);
        
        done();
    });
    
});

describe('Assert:NotNull Validations', function() {
    
    it('NotNull on property should add violation on non-existant value', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:NotNull()']
        })
        violationList = constraintCollection.perform.validate({})
        assert.ok(violationList);
        assert.ok(1===violationList.length);
        done();
    });
    
    it('NotNull on property should not add violation on non null value', function(done){
        var constraintCollection = eValidator.Assert({name: ['@Assert:NotNull()']});
        violationList = constraintCollection.perform.validate({"name": "foo"})
        assert.ok(_.isNull(violationList));
        var constraintCollection = eValidator.Assert({name: ['@Assert:NotNull()']});
        violationList = constraintCollection.perform.validate({"name": 1324})
        assert.ok(_.isNull(violationList));
        var constraintCollection = eValidator.Assert({name: ['@Assert:NotNull()']});
        violationList = constraintCollection.perform.validate({"name": [1,2,3]})
        assert.ok(_.isNull(violationList));
        done();
    });
    
    it('NotNull on property should add violation on null value', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:NotNull()']
        })
        violationList = constraintCollection.perform.validate({"name": null})
        assert.ok(_.isArray(violationList));
        assert.ok(1===violationList.length);
        done();
    });
    
});

describe('Assert:Range Validations', function(){
    
    it('No numeric value should add a violation', function(done){
        var constraintCollection = eValidator.Assert({
            value: ['@Assert:Range(min=0,max=50)']
        })
        violationList = constraintCollection.perform.validate({value:"string"})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        done();
    });
    
    it('Only min defined should return violations only for smaller values', function(done){
        var constraintCollection = eValidator.Assert({
            value: ['@Assert:Range(min=18)']
        })
        violationList = constraintCollection.perform.validate({value:-10})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:0})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:18})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({value:1000})
        assert.ok(_.isNull(violationList));
        done();
    });
    
    it('Only max defined should return violations only for greater values', function(done){
        var constraintCollection = eValidator.Assert({
            value: ['@Assert:Range(max=100)']
        })
        violationList = constraintCollection.perform.validate({value:1000})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:110})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:100})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({value:12})
        assert.ok(_.isNull(violationList));
        done();
    });
    
    it('For range values should add violations for values out of range', function(done){
        var constraintCollection = eValidator.Assert({
            value: ['@Assert:Range(min=22,max=100)']
        })
        violationList = constraintCollection.perform.validate({value:10})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:110})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        
        violationList = constraintCollection.perform.validate({value:33})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({value:99})
        assert.ok(_.isNull(violationList));
        
        //Borders
        violationList = constraintCollection.perform.validate({value:22})
        assert.ok(_.isNull(violationList));
        
        violationList = constraintCollection.perform.validate({value:100})
        assert.ok(_.isNull(violationList));
        done();
    });
    
});

describe('Assert:Null Validations', function() {
    
    it('Null on property should not add violation on non-existant value', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Null()']
        })
        violationList = constraintCollection.perform.validate({})
        assert.ok(_.isNull(violationList));
        done();
    });
    
    it('Null on property should add violation on non null value', function(done){
        var constraintCollection = eValidator.Assert({name: ['@Assert:Null()']});
        violationList = constraintCollection.perform.validate({"name": "foo"})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        violationList = constraintCollection.perform.validate({"name": 1324})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        violationList = constraintCollection.perform.validate({"name": [1,2,3]})
        assert.ok(_.isArray(violationList));
        assert.ok(0<violationList.length);
        done();
    });
    
    it('Null on property should not add violation on null value', function(done){
        var constraintCollection = eValidator.Assert({
            name: ['@Assert:Null()']
        })
        violationList = constraintCollection.perform.validate({"name": null})
        assert.ok(_.isNull(violationList));
        done();
    });
    
});