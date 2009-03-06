Inspec.Example = function(description, implementation, options){
  this.description = description;
  this.implementation = implementation;
  this.options = options;
};

Inspec.Example.prototype = {
  run  :  function(runOptions, variables){
    var executionError = null;
    try{
      this.beforeEachExample();
      this.implementation.apply(this);
    }catch(e){
      executionError = executionError || e;
    }
    try{
      this.afterEachExample();
    }catch(e){
      executionError = executionError || e;
    }
    var success = executionError ? true : false;
    return success;
    
    // runOptions.reporter.exampleStarted("");
    // var executionError = null;
    // 
    // try{
    //   this.beforeEachExample();
    //   this.implementation.apply(this);
    // }catch(e){
    //   executionError = executionError || e;
    // }
    // try{
    //   this.afterEachExample();
    // }catch(e){
    //   executionError = executionError || e;
    // }
    // 
    // runOptions.reporter.exampleFinished(this.description, executionError);
    // 
    // var success = executionError ? true : false;
    // 
    // return success;
  },
  
  getDescription : function(){
    return this.description;
  },
  
  // returns a subject that can do "should bla"  
  valueOf : function(subject){

  },
  
  pending : function(message){
    
  },
  
  setBeforeEach : function(implementation) {
    this.beforeEach = implementation;
  },
  
  setAfterEach : function(implementation) {
    this.afterEach = implementation;
  },
// private  
  beforeEachExample : function(){
    for(var i=0; i < this.beforeEach.length; i++){
      this.beforeEach[i]();
    }
  },
  
  afterEachExample  : function(){
    for(var i=0; i < this.afterEach.length; i++){
      this.afterEach[i]();
    }
  }
};

Inspec.Example.createExample = function(description, implementation){
  var currentExampleGroup = Inspec.ExampleGroup.lastAddedExamplGroup;
  if(!currentExampleGroup){
    throw new Error("Cannot Create examples outside of ExampleGroup!");
  }
  var example = new Inspec.Example(description, implementation);
  example.setBeforeEach(currentExampleGroup.getBeforeEach());
  example.setAfterEach(currentExampleGroup.getAfterEach());
  currentExampleGroup.addExample(example);
};