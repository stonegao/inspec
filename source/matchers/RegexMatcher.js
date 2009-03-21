Inspec.matchers.RegexMatcher = Inspec.matchers.Matcher.extend({
  matches : function(){
    this.result = (this.actual.toString().match(this.expected));
    this.result = this.xor(this.result, this.negative);
    return this.result;
  },
  
  explain : function(){
    if(this.result == null)this.matches();
    var str = "Expected " + this.actual.toString();
    str += (this.negative ? " not" : "");
    str += " to be identical (===) to " + this.expected;
    if(!this.result)
      return  str; 
  }
});
