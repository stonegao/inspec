Inspec.Exception = Inspec.Class.extend({
  init : function(message){
    this.message = message.toString();
  },
  
  toString : function(){
    return this.message;
  }
});

Inspec.ExpectationFailure = Inspec.Exception.extend({});

Inspec.NotImplemented = Inspec.Exception.extend({});
