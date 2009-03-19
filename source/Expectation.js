Inspec.ExpectationFailure = function(message){
  this.message = message.toString();
};

Inspec.ExpectationFailure.prototype = {
  toString : function(){
    return this.message;
  }
};

Inspec.Expectation = function(subject){
  this.subject = subject;
  this.negative = false;
};

// expect(a).not().toBe(b)
// expect(a).not().toFail()
// expect(a).toBeEmpty()

Inspec.Expectation.prototype = {
  judge : function(matcher){
    var result = matcher.matches();
    if(!result){
		  throw new Inspec.ExpectationFailure(matcher);
    }  
  },
  
  not  : function(){
    this.negative = !this.negative;
    return this;
  },
  
  // apply to object
  toBe : function(expected){
    var matcher = new Inspec.matchers.EqualityMatcher(expected, this.subject, this.negative);
    this.judge(matcher);
  },

  // apply to object  
  toBeIdenticalTo : function(expected){
    var matcher = new Inspec.matchers.IdentityMatcher(expected, this.subject, this.negative);
    this.judge(matcher);    
  },

  // apply to function  
  toFail : function(){
  },

  // apply to string, array
  toBeEmpty : function(){
  },
  
  // apply to object
  toBeUndefined : function(){
    this.toBe(anUndefinedValue);
  },
  
  // apply to object
  toBeNull : function(){
    this.toBeIdenticalTo(null);
  },
  
  // apply to object
  toBeTrue : function(){
    this.toBeIdenticalTo(true);
  },
  
  // apply to object
  toBeFalse : function(){
    this.toBeIdenticalTo(false);
  },
  
  // apply to string
  toMatch : function(pattern){
    
  },
  
  // apply to object
  toInclude : function(property){
  
  },
  
  // apply to string, array
  toHave : function(occurance, property){
  },
  
  // apply to string, array  
  toHaveExactly : function(occurance, property){
  },

  // apply to string, array  
  toHaveAtLeast : function(occurance, property){
  },

  // apply to string, array  
  toHaveAtMost : function(occurance, property){
  }
  
};
