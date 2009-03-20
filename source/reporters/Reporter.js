Inspec.Reporter = Inspec.Class.extend({
  init : function(messenger){
    this.messenger = messenger;
    console.log("bla");
    this.subscribeMessages();
  },

  subscribeMessages : function(){
    this.messenger.on("beginTest", this.onStartTest, this);
    this.messenger.on("endTest", this.onEndTest, this);
    this.messenger.on("beginExampleGroup", this.onStartExampleGroup, this);
    this.messenger.on("endExampleGroup", this.onEndExampleGroup, this);
    this.messenger.on("beginExample", this.onStartExample, this);
    this.messenger.on("endExample", this.onEndExample, this);
  },
  
  onStartTest : function(message){
  },
  
  onEndTest : function(message){
  },
  
  onStartExampleGroup : function(message){
  },
  
  onEndExampleGroup : function(message){
  },
  
  onStartExample : function(message){
  },
  
  onEndExample : function(message){
  }
});
