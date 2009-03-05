Inspec.Example = function(description, options, implementation){
  this.description = description;
  this.implementation = implementation;
  this.options = options;
};

Inspec.Example.prototype = {
  run  :  function(runOptions, variables){
    runOptions.reporter.exampleStarted("");
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
    
    runOptions.reporter.exampleFinished(this.description, executionError);
    
    var success = executionError ? true : false;
    
    return success;
  },
  
  // returns a subject that can do "should bla"  
  valueOf : function(subject){

  },
  
  pending : function(message){
    
  }


// private  
  beforeEachExample : function(){
  },
  
  afterEachExample  : function(){
  }
};

Inspec.Example.addParentTo : function(options){
  options.parentExampleGroup = 
}
