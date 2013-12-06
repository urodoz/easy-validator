easy-validator
==============

Simple object validator for NodeJS (as Symfony Annotation validation system)

Installation
------------

```shell
$ npm install easy-validator
```

To run the unit tests with moche from your project :

```shell
mocha --recursive node_modules/easy-validator/test/
```

Validating Objects
------------------

Sample of simple validating a not null string from an object :

```javascript
var _ = require('underscore');
var eValidator = require('easy-validator');

//Creating sample object
var objectToValidate = {
  name: "Foo"
};

//Create the constraint collection (The name property should pass the 2 validations , NotNull and String type
var constraintCollection = eValidator.Assert({
  name: ['@Assert:NotNull()', '@Assert:Type("string")'] // <-- Array of asserts
});

//Validate the object, and retrieve the list of errors
violationList = constraintCollection.perform.validate(objectToValidate);

//You can see all errors on the violationsList (array)
_.each(violationList, function(violation){
  console.log("Property ["+violation.propertyPath+"] Error ["+violation.message+"]");
});
```

List of Asserts
---------------

##### @Assert:NotNull()

Forces a value to be not null value, and to be defined. Will add an error to violation list if null or undefined

###### No configuration

##### @Assert:Null()

Forces a value to be null value, or be undefined. Will add an error to violation list if not null or defined

###### No configuration

##### @Assert:Type()

Forces a value to be null value, or be undefined. Will add an error to violation list if not null or defined

###### Allowed configuration of type (default configured to 'string')

Sample for array type

```javascript
var constraintCollection = eValidator.Assert({
  name: ['@Assert:Type("array")']
})
```

Allowed types :

+ string
+ array
+ object
+ boolean
+ numeric

TODO
----

Keep implementing Asserts implemented on Symfony2 current validation system 

http://symfony.com/doc/current/book/validation.html
