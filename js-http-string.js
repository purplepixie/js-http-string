/**
 * js-http-string
 * Javascript HTTP String Library
 *
 * (C) Copyright David Cutting 2018, all rights reserved
 * http://www.purplepixie.org/dave/
 * http://davecutting.uk/
 *
 * Licenced under the GNU GPL v3 - see the LICENCE file for details
**/

function JS_HTTP_STRING()
{
    this.keys = new Array();
    this.values = new Array();

    // Set a key/value pair - will append if doesn't exist, otherwise update the stored value
    this.set = function(k,v)
    {
        var x = this.keys.indexOf(k);
        if (x == -1) // not in array
        {
            this.keys.push(k);
            this.values.push(v);
        }
        else // exists - update
        {
            this.values[x]=v;
        }
        return this;
    }

    // Load a JSON object as a set of key/value pairs - iterate through and use set()
    this.json = function(j)
    {
        for (k in j)
        {
            v=j[k];
            this.set(k,v);
        }
        return this;
    }

    // Output correct URI-formatted string of variables
    this.string = function()
    {
        var output = "";
        for(var x=0; x<this.keys.length; ++x)
        {
            if (x != 0)
                output += "&";
            output += encodeURI(this.keys[x]) + "=" + encodeURI(this.values[x]);
        }
        return output;
    }

    // Wrapper for string() for Java people
    this.toString = function()
    {
        return this.string();
    }

    // Reset the data (clear everything)
    this.reset = function()
    {
        this.keys = new Array();
        this.values = new Array();
        return this;
    }

    // Length (contents) of key/value pairs
    this.length = function()
    {
        return this.keys.length;
    }

    // Unset (clear) a value held against this key (delete key and value)
    this.unset = function(k)
    {
        var x = this.keys.indexOf(k);
        if (x != -1)
        {
            this.keys.splice(x, 1);
            this.values.splice(x, 1);
        }
        return this;
    }

    // Contains this key (true) or doesn't (false)
    this.contains = function(k)
    {
        var x = this.keys.indexOf(k);
        if (x == -1) return false;
        return true;
    }
}
