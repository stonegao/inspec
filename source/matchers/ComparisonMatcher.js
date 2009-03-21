Inspec.matchers.ComparisonMatcher = Inspec.matchers.Matcher.extend({
  init : function(expected, actual, options){
    this._super.apply(this, arguments);

    this.operator = options.operator;
  },
  
  matches : function(){
    
    this.result = eval("this.actual" + this.operator + "this.expected");
    this.result = this.xor(this.result, this.negative);
    return this.result;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    var str = "Expected " + this.actual.toString();
    str += (this.negative ? " not" : "");
    str += " to be " + this.operator + " to " + this.expected;
    if(!this.result)
      return  str; 
  }
});
