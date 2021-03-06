Inspec.ConsoleReporter = Inspec.Reporter.extend({
  onStartTest : function(message){
    print("Start Test");
  },
  
  onEndTest : function(message){
    print("End Test");
  },
  
  onStartExampleGroup : function(message){
  },
  
  onEndExampleGroup : function(message){
  },
  
  onStartExample : function(message){
     print(this.getDescription(message.example));
  },
  
  onEndExample : function(message){
    var example = message.example;
    var success = message.success;
    var error = message.error;
    if(success)
      print("success");
    else{
      if(error instanceof Inspec.ExpectationFailure){
        print("Failure : " + error);
      } else if(error instanceof Error){
        print("Error : " + error);
      }
    }
  },
  
  getExampleGroupDescription : function(exampleGroup){
    var parent = exampleGroup.getParent();
    var description = exampleGroup.getDescription();
    if(parent)
      description = this.getExampleGroupDescription(parent) + " " + description;
    return description;
  },
  
  getDescription : function(example){
    var desc =  this.getExampleGroupDescription(example.exampleGroup)
      + " " + example.getDescription();
    return desc;
  }
});
