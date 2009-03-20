Inspec.Environment = Inspec.Class.extend({
  init : function(){
    this.initFacility();
  },
  
  initFacility : function(){
    this.messenger = new Inspec.util.Messenger();
    this.exampleGroupManager = new Inspec.ExampleGroupManager();
    var reporter = this.reporterClass();
    this.reporter = new reporter(this.messenger);
    this.runner = new Inspec.Runner(this.exampleGroupManager.root, this.messenger);
  },
  
  getExampleGroupManager : function(){
    return this.exampleGroupManager;
  },
  
  getMessenger : function(){
    return this.messenger;
  },
  
  getReporter : function(){
    return this.reporter;
  },
  
  getRunner : function(){
    return this.runner;
  },
  
  run : function(){
    this.exampleGroupManager.prepare();
    this.runner.execute();
  },

  load : function(location){
    var file = this.loadFile(location);
    var dsl = Inspec.options.dsl || Inspec.dsl.BDD;
    with(dsl){
      eval(file);
    }
  },
  
  reporterClass : function(){
    throw new Inspec.NotImplemented();
  },
	
  loadFile : function(location){
    throw new Inspec.NotImplemented();
  }
});

Inspec.Environment.getInstance = function(){
  if(!Inspec.Environment._instance){
  	if(Inspec.root.navigator)
		  Inspec.Environment._instance = new Inspec.BrowserEnvironment();
	  else if(Inspec.root.load)
		  Inspec.Environment._instance = new Inspec.RhinoEnvironment();
	  else if(Inspec.root.WScript)
		  Inspec.Environment._instance = new Inspec.WScriptEnvironment();
		else
		  throw new Inspec.UnkownEnvironment();
  }
  return Inspec.Environment._instance;
};
