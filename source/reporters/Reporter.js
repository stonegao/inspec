Inspec.Reporter = Inspec.Class.extend({
  init : function(messenger){
    this.messenger = messenger;
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
    throw new Inspec.NotImplemented();
  },
  
  onEndTest : function(message){
    throw new Inspec.NotImplemented();
  },
  
  onStartExampleGroup : function(message){
    throw new Inspec.NotImplemented();
  },
  
  onEndExampleGroup : function(message){
    throw new Inspec.NotImplemented();
  },
  
  onStartExample : function(message){
    throw new Inspec.NotImplemented();
  },
  
  onEndExample : function(message){
    throw new Inspec.NotImplemented();
  }
});
