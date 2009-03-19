Inspec.Reporter = function(messenger){
  this.messenger = messenger;
  this.subscribeMessages();
}

Inspec.Reporter.prototype = {
  onStartTest : function(message){
    console.log("Start Test");
  },
  
  onEndTest : function(message){
    console.log("End Test");
  },
  
  onStartExampleGroup : function(message){
  },
  
  onEndExampleGroup : function(message){
  },
  
  onStartExample : function(message){
     console.log(this.getDescription(message.example));
  },
  
  onEndExample : function(message){
    var example = message.example;
    var success = message.success;
    var error = message.error;
    if(success)
      console.log("success");
    else{
      if(error instanceof Inspec.ExpectationFailure){
        console.log("Failure : " + error);
      } else if(error instanceof Error){
        console.log("Error : " + error);
      }
    }
  },
  
  subscribeMessages : function(){
    this.messenger.on("beginTest", this.onStartTest, this);
    this.messenger.on("endTest", this.onEndTest, this);
    this.messenger.on("beginExampleGroup", this.onStartExampleGroup, this);
    this.messenger.on("endExampleGroup", this.onEndExampleGroup, this);
    this.messenger.on("beginExample", this.onStartExample, this);
    this.messenger.on("endExample", this.onEndExample, this);
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
  
};

Inspec.reporter = new Inspec.Reporter(Inspec.messenger);
