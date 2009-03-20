Inspec.Expectation = Inspec.Class.extend({
  init : function(subject){
    this.subject = subject;
    this.negative = false;
  },
  
  judge : function(matcher){
    var result = matcher.matches();
    if(!result){
		  throw new Inspec.ExpectationFailure(matcher);
    }  
  },
  
  // expect(a).not().toBe(b)
  // expect(a).not().toFail()
  // expect(a).toBeEmpty()
  not  : function(){
    this.negative = !this.negative;
    return this;
  },
  
  // apply to object  
  toEqual : function(expected){
    var matcher = new Inspec.matchers.IdentityMatcher(expected, this.subject, {negative : this.negative});
    this.judge(matcher);    
  },
  
  toBeA : function(expected){
    var matcher = new Inspec.matchers.InstanceMatcher(expected, this.subject, {negative : this.negative});
    this.judge(matcher);  
  },
  
  toBeAtLeast : function(expected){
    var matcher = new Inspec.matchers.ComparisonMatcher(expected, 
        this.subject, {negative : this.negative, operator : ">="});
    this.judge(matcher);
  },

  toBeAtMost : function(expected){
    var matcher = new Inspec.matchers.ComparisonMatcher(expected, 
        this.subject, {negative : this.negative, operator : "<="});
    this.judge(matcher);
  },
  
  // apply to object
  toBeNull : function(){
    this.toEqual(null);
  },
  
  // apply to object
  toBeUndefined : function(){
    this.toBe(anUndefinedValue);
  },
    
  // apply to string, array
  toBeEmpty : function(){
  },
  
  // apply to object
  toBeTrue : function(){
    this.toEqual(true);
  },
  
  // apply to object
  toBeFalse : function(){
    this.toEqual(false);
  },
  
  toBeType : function(expected){
  },
  
  toBeGreaterThan : function(expected){
    var matcher = new Inspec.matchers.ComparisonMatcher(expected, 
        this.subject, {negative : this.negative, operator : ">"});
    this.judge(matcher);
  },

  toBeLessThan : function(expected){
    var matcher = new Inspec.matchers.ComparisonMatcher(expected, 
        this.subject, {negative : this.negative, operator : "<"});
    this.judge(matcher);
  },
  
  toBeWithIn : function(least, most){
  },
  
  toHaveLength : function(expected){
  },
  
  toInclude : function(expected){
  },
  
  // apply to string
  toMatch : function(pattern){
    
  },  
  
  toRespondTo : function(fnName){
  },
  
  toEql : function(expected){
    var matcher = new Inspec.matchers.EqualityMatcher(expected, this.subject, {negative : this.negative});
    this.judge(matcher);
  },
  
  // apply to object
  toBe : function(expected){

  },

  // apply to function  
  toThrowError : function(){
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
});

Inspec.Expectation.prototype.toBeAn = Inspec.Expectation.prototype.toBeA;
Inspec.Expectation.prototype.toBe = Inspec.Expectation.prototype.toEql;
