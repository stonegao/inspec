Inspec.matchers.Matcher = Inspec.Class.extend({
  init : function(expected, actual, options){
    this.expected = expected;
    this.actual = actual;
    this.negative = options.negative;
    this.result = null;
  },

  matches : function(){
    throw new Inspec.NotImplemented();
  },  

  explain : function(){
    throw new Inspec.NotImplemented();
  },
  
  xor : function(l, r) {
    return (l || r) && !(l && r);
  },
  
  toString : function(){
    return this.explain();
  }
});
