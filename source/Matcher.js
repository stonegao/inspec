Inspec.matchers = {};

Inspec.matchers.EqualityMatcher = function(expected, actual, negative){
  this.expected = expected;
  this.actual = actual;
  this.negative = negative;
  this.result = null;
}

Inspec.matchers.EqualityMatcher.prototype = {
  // Returns true or false
  matches : function(){
    return true;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    
    // do the explanation here
  },
  
  toString : function(){
    return this.explain();
  }
};

Inspec.matchers.IdentityMatcher = function(expected, actual, negative){
  this.expected = expected;
  this.actual = actual;
  this.negative = negative;
  this.result = null;
}

Inspec.matchers.IdentityMatcher.prototype = {
  xor : function(l, r) {
    return (l || r) && !(l && r);
  },

  // Returns true or false
  matches : function(){
    this.result = (this.expected === this.actual);
    this.result = this.xor(this.result, this.negative);
    return this.result;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    var str = "Expected " + this.actual.toString();
    str += (this.negative ? " not" : "");
    str += " to be identical to " + this.expected;
    if(!this.result)
      return  str; 
  },
  
  toString : function(){
    return this.explain();
  }
};
