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

# More Examples

See the shipped demo.html for more examples including anonymous use of the class.
