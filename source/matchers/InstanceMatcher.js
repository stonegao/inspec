Inspec.matchers.InstanceMatcher = Inspec.matchers.Matcher.extend({
  matches : function(){
    this.result = (this.actual instanceof this.expected);
    this.result = this.xor(this.result, this.negative);
    return this.result;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    var str = "Expected " + this.actual;
    str += (this.negative ? " not" : "");
    str += " to be an instance of '" + this.expected + "'";
    if(!this.result)
      return  str;
  }
});
