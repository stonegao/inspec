Inspec.Environment = Inspec.Class.extend({
  init : function(){
    this.initFacility();
    this.loadAllSpecs();
  },
  
  initFacility : function(){
    this.messenger = new Inspec.util.Messenger();
    this.exampleGroupManager = new Inspec.ExampleGroupManager();
    this.reporter = new Inspec.HtmlReporter(this.messenger);
    this.runner = new Inspec.Runner(this.exampleGroupManager.root, this.messenger);
  },
  
  loadAllSpecs : function(){
    this.pendingScripts = {};
    for(var i=0; i < Inspec.options.specFiles.length; i++)
      this.pendingScripts[Inspec.options.specFiles[i]] = true;
      
    for(var i=0; i < Inspec.options.specFiles.length; i++)
      this.loadSpec(Inspec.options.specFiles[i]);
      
    this.waitForLoad(this);
  },
  
  pending : function(){
    console.log(this.pendingScripts);
    for(var location in this.pendingScripts){
      if (this.pendingScripts[location] == true){
        console.log("pending");
        return true;
      }
    }
    console.log("loadComplete");
    return false;
  },
  
  runSpec : function(){
    this.messenger.on("specLoadComplete", function(){
      this.exampleGroupManager.prepare();
      this.runner.execute();
    }, this);
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
  
  markComplete : function(location){
    this.pendingScripts[location] = false;
  },
  
  waitForLoad : function(scope){
    var wait = function(){
      if (!scope.pending())
        scope.messenger.send("specLoadComplete");
      else
        setTimeout(wait, 100);
    };
    wait();
   },
	
  loadSpec : function(location){
    var document = Inspec.root.document;
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = location;
    var scope = this;
    script.onload = function(){
      console.log("complete??");
      scope.markComplete(location);
    };
    head.appendChild(script);
    
    script.onreadystatechange = function(){
      if(this.readyState == 'complete'){
        scope.markComplete(location);
      }
    }
  }
});

Inspec.Environment.getInstance = function(){
  if(!Inspec.Environment._instance)
    Inspec.Environment._instance = new Inspec.Environment();
   return Inspec.Environment._instance;
};
