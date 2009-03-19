Inspec.Runner = function(root, messenger){
  this.root = root;
  this.messenger = messenger;
};

Inspec.Runner.prototype = {
  currentScope : function(){
    return {};
  },

  // runs the entire set
  // executes all example groups in order
  execute : function() {
    this.messenger.send("beginTest");
    this.root.each(function(node){
      var exampleGroup = node.getContent();
      if(exampleGroup)
        this.executeExampleGroup(exampleGroup);
    }, this);
    this.messenger.send("endTest");
  },
  
  // executes the specified example group
  executeExampleGroup : function(exampleGroup){
    if(exampleGroup.hasExamples())
    {
      this.messenger.send("beginExampleGroup", {exampleGroup : exampleGroup});
      var scope = {};
      this.executeBeforeAll(exampleGroup);
      this.executeExamples(exampleGroup);
      this.executeAfterAll(exampleGroup);
      this.messenger.send("endExampleGroup", {exampleGroup : exampleGroup});
    }
  },
  
  // runs all examples in this example group
  executeExamples : function(exampleGroup){
    for(var i=0; i< exampleGroup.examples.length; i++){
      this.executeExample(exampleGroup.examples[i]);
    }    
  },
  
  // runs before all clauses of all parent and current example groups.
  // immediate parents are run last     
  executeBeforeAll : function(exampleGroup){
    var parent = exampleGroup.getParent();
    if(parent){
      this.executeBeforeAll(parent);
    }
    if(typeof exampleGroup.beforeAll == "function")
      exampleGroup.beforeAll.call(this.currentScope());
  },

  // runs after all caluases of all parent and current example groups.
  // current is run first, and then immediate parent is run  
  executeAfterAll : function(exampleGroup){
    if(typeof exampleGroup.afterAll == "function")
      exampleGroup.afterAll.call(this.currentScope());
    var parent = exampleGroup.getParent();
    if(parent){
      this.executeAfterAll(parent);
    }
  },

  // runs before each clauses of all parent and current example groups.
  // immediate parents are run last    
  executeBeforeEach : function(exampleGroup){
    var parent = exampleGroup.getParent();
    if(parent){
      this.executeBeforeEach(parent);
    }
    if(typeof exampleGroup.beforeEach == "function")
      exampleGroup.beforeEach.call(this.currentScope());
  },
  
  // runs after each caluases of all parent and current example groups.
  // current is run first, and then immediate parent is run
  executeAfterEach : function(exampleGroup){
    if(typeof exampleGroup.afterEach == "function")
      exampleGroup.afterEach.call(this.currentScope());
    var parent = exampleGroup.getParent();
    if(parent){
      this.executeAfterEach(parent);
    }
  },
  
  // executes user specified implementation of this example
  // Returns success or failure
  // exceptions are caught and recorded
  executeExample : function(example){
    var executionError = null;
    var exampleGroup = example.exampleGroup;
    this.messenger.send("beginExample", {example : example});
    try{
      this.executeBeforeEach(exampleGroup);
      this.executeExampleImplementation(example);
    }catch(e){
      executionError = executionError || e;
    }
    try{
      this.executeAfterEach(exampleGroup);
    }catch(e){
      executionError = executionError || e;
    }
    
    var success = executionError ? true : false;
    
    this.messenger.send("endExample", {example : example});
    return success;    
  },
  
  // run the implementation of the example group
  executeExampleImplementation : function(example){
    example.implementation.call(this.currentScope());
  }
};

Inspec.runner = new Inspec.Runner(Inspec.ExampleGroup.manager.root, Inspec.messenger);
