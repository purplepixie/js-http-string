# js-http-string
Javascript library to help preparing URL-formatted strings for GET or POST submissions

# Simple Usage Example

**Use case:** JSON (single depth) object with key-value pairs, to be turned into a query-string suitable for use in GET or as the body in POST.

Example JSON object:

```
var example = {
    "one": 1,
    "two": 2,
    "three": 3
};
```

Code to generate these as a URL-encoded string:

```
var s = new JS_HTTP_STRING().json(example).string();
```

In this example the contents of _s_ would be:

```
one=1&two=2&three=3
```

# Loading Data

Once a JS_HTTP_STRING object is instantiated data (key/value pairs) can be loaded either individually using the _set()_ method or from an existing JSON object (single depth) using the _json()_ method. Various examples are contained in the provided demo.html to demonstrate each method.

## Individual Key/Values With set()

Set is used on the instance and accepts two parameters, the key and the value. If the key is already set the value is updated, otherwise the key and value are added.

```
var x = new JS_HTTP_STRING();
x.set('a','b');
x.set('c','d');
```

Set returns _this_ so can be chained together.
```
var x = new JS_HTTP_STRING();
x.set('a','b').set('c','d');
```

## From a JSON Object With json()

This method will iterate through the key/value pairs in the JSON object and call _set()_ in turn for each pair found.

```
var o = { 'a':'b', 'c':'d' };
var x = new JS_HTTP_STRING();
x.json(o);
```

Note of course you can directly use JSON notation as the parameter to the function.
```
var x = new JS_HTTP_STRING();
x.json({'a':'b'});
```

# Outputting Data

A URL-formatted string will be generated and returned with the _string()_ method.
```
var x = new JS_HTTP_STRING();
x.set('a','b').set('c','d');
var s = x.string();
```

In this example _s_ will contain:
```
a=b&c=d
```

# Slightly More Complex Example

**Use case:** We want to build a GET URL containing various bits of data, we have two JSON objects one containing the call-specific data and another containing the session values we must pass with the call. We also wish to add a further incremental value to the call to avoid cacheing.

```
// The JSON object containing data for the call
var callData = {
    'action': 'update', 'id': 123, 'telephone': '555-0123'
};

// The JSON object containing the session values
var sessionData = {
    'sessionid': 'abcdef12345'
};

// The base URL to call
var baseURL = 'http://example.com/api/';

// Our incremental value
var increment = 456;

// Create a js-http-string object
var x = new JS_HTTP_STRING();

// Load the call JSON
x.json(callData);

// Load the session values (note if the keys were the same this would overwrite)
x.json(sessionData);

// Set our increment (same rule about the keys)
x.set('increment',increment);

// Generate the query string
var queryString = x.string();

// Finalise the URI
var uri = baseURL + '?' + queryString;
```

Note that a shorthand could have been used to load the data into the js-http-string object:

```
// Create a js-http-string object
var x = new JS_HTTP_STRING();

// Load the data
x.json(callData).json(sessionData).set('increment',increment);
```

And in fact the whole thing could be simplified into one line to load the data and generate the query string.

```
var queryString = new JS_HTTP_STRING().json(callData).json(sessionData).set('increment',increment);
```

# More Examples

See the shipped demo.html for more examples including anonymous use of the class.

# Code Documentation

## set(key,value)

Sets a key/value pair in the data store. If key exists the value is updated otherwise the key and value and inserted. Returns this.

## json(obj)

Load a JSON object as key/values into the data store (uses _set()_ to actually store data so will update and append). Returns this.

## string()

Returns the URI-encoded formatted string of the key/value sets in the data store in the form: URI-encoded key = URI-encoded value with items seperated by &.

## toString()

Wrapper for _string()_

## reset()

Reset the data store (clear all key/value pairs). Returns this.

## length()

Returns the length (int) of the store.

## unset(key)

Unset (clear) a value held against this key (delete key and value). Returns this.

## contains(key)

Returns a boolean indicating if the given key is stored in the data store.
