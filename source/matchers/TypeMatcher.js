Inspec.matchers.TypeMatcher = Inspec.matchers.Matcher.extend({
  matches : function(){
    this.result = (typeof this.actual === this.expected);
    this.result = this.xor(this.result, this.negative);
    return this.result;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    var str = "Expected " + this.actual;
    str += (this.negative ? " not" : "");
    str += " to be type '" + this.expected + "'";
    str += ", but was type '" + typeof this.actual + "'";
    if(!this.result)
      return  str;
  }
});
