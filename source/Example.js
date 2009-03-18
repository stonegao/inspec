Inspec.Example = function(exampleGroup, description, implementation, options){
  this.exampleGroup = exampleGroup;
  this.description = description;
  this.implementation = implementation;
  this.options = options;
};

Inspec.Example.prototype = {
  // executes user specified implementation of this example
  // Returns success or failure
  // exceptions are caught and recorded
  run  :  function(scope, runOptions){
    var executionError = null;
    try{
      this.beforeEachExample(scope);
      this.implementation.call(scope);
    }catch(e){
      executionError = executionError || e;
    }
    try{
      this.afterEachExample(scope);
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
  
  // returns the description of this example
  getDescription : function(){
    return this.description;
  },
    
  // private function
  // executes the before each clause of the parent example groups in order,
  // immediate parent example group is executed first
  beforeEachExample : function(scope){
    this.exampleGroup.beforeEachExample(scope);
  },
  
  // executes the after each clause of parent example groups in reverse order
  // immediate parent example group is executed last
  afterEachExample  : function(scope){
    this.exampleGroup.afterEachExample(scope);
  }
};

// creates a new example and adds it to the current example group
Inspec.Example.createExample = function(description, implementation){
  var currentExampleGroup = Inspec.ExampleGroup.current();
  if(!currentExampleGroup){
    throw new Error("Cannot Create examples outside of ExampleGroup!");
  }
  var example = new Inspec.Example(currentExampleGroup, description, implementation);
  currentExampleGroup.addExample(example);
};
