easy-validator
==============

Simple object validator for NodeJS (as Symfony Annotation validation system)

Status
------

[![Build Status](https://travis-ci.org/urodoz/easy-validator.png?branch=master)](https://travis-ci.org/urodoz/easy-validator)

Installation
------------

```shell
$ npm install easy-validator
```

To run the unit tests with mocha from your project :

```shell
npm test
```

Validating Objects
------------------

Sample of simple validating a not null string from an object :

```javascript
var _ = require('underscore');
var eValidator = require('easy-validator');

//Creating sample object
var objectToValidate = {
  name: "Foo",
  email: "urodoz@gmail.com",
  age: 33
};

//Create the constraint collection (The name property should pass the 2 validations , NotNull and String type
var constraintCollection = eValidator.Assert({
  name:  ['@Assert:NotNull()', '@Assert:Type("string")'], // <-- Array of asserts for each property required to validate
  email: ['@Assert:Email()'],
  age:   ['@Assert:Range(min=18,max=99)']
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

##### @Assert:Email() For string values

Forces a value to be a valid email

Sample :

```javascript
var constraintCollection = eValidator.Assert({
  email_address: ['@Assert:Email()']
})
```

###### No configuration

##### @Assert:NotNull()

Forces a value to be not null value, and to be defined. Will add an error to violation list if null or undefined

###### No configuration

##### @Assert:Null()

Forces a value to be null value, or be undefined. Will add an error to violation list if not null or defined

###### No configuration

##### @Assert:Range() For numeric values

Forces a value to be defined in a range of numbers. Should be between min and max configurations if defined.
Both configuration 'min' and 'max' are optional configurations.

Sample :

```javascript
var constraintCollection = eValidator.Assert({
  name: ['@Assert:Range(min=18,max=99)'] //Should be between 18 and 99 the value to be matched
})
```

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
