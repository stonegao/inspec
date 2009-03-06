Inspec.ExampleGroup = function(description, implementation, options){
  this.description = description;
  this.implementation = implementation;
  this.examples = new Inspec.OrderedHash();
  this.options = options || {};
  this.sharedExampleGroups = [];
  this.beforeEach = [];
  this.afterEach = [];
  this.beforeAll = [];
  this.afterAll = [];
};

Inspec.ExampleGroup.prototype = {
  getDescription : function(){
    return this.description;
  },
  
  addSharedExampleGroups : function(){
    this.sharedExampleGroups = this.sharedExampleGroups.concat.apply(this.sharedExampleGroups, arguments);
  },
  
  run : function(){
    this.beforeAllExample();
    this.runExamples();
    this.afterAllExample();
  },
  
  addParentBeforeAfter : function(parent){
    this.addBeforeEach(parent.getBeforeEach());
    this.addBeforeAll(parent.getBeforeAll());
    this.addAfterEach(parent.getAfterEach());
    this.addAfterAll(parent.getAfterAll());    
  },
  
  beforeAllExample : function(){
    for(var i=0; i < this.beforeAll.length; i++){
      this.beforeAll[i]();
    }
  },
  
  afterAllExample : function(){
    for(var i=0; i < this.afterAll.length; i++){
      this.afterAll[i]();
    }
  },
  
  runExamples : function(){
    this.examples.each(function(description, example){
      example.run();
    }, this);
  },
  
  init : function(){
    this.pushToStack();
    this.implementation();
    this.popFromStack();
  },
  
  isShared : function(){
    return (this.options.shared ? true : false);
  },
  
  addExample : function(example){
    this.examples.set(example.getDescription(), example);
  },
  
  pushToStack : function(){
    Inspec.ExampleGroup.pushStack(this);
  },
  
  popFromStack : function(){
    Inspec.ExampleGroup.popStack(this);
  },
  
  addBeforeEach : function(aryOrFunction){
    this.beforeEach = this.beforeEach.concat(aryOrFunction);
  },
  
  addAfterEach : function(aryOrFunction){
    var ary = aryOrFunction;
    if(!(ary instanceof Array)){
      var ary = [ary];
    }
    this.afterEach = ary.concat(this.afterEach);
  },
  
  addBeforeAll : function(aryOrFunction){
    this.beforeAll = this.beforeAll.concat(aryOrFunction);
  },
  
  addAfterAll : function(aryOrFunction){
    var ary = aryOrFunction;
    if(!(ary instanceof Array)){
      var ary = [ary];
    }
    this.afterAll = ary.concat(this.afterAll);
  },
  
  getBeforeEach : function(){
    return this.beforeEach;
  },
  
  getAfterEach : function(){
    return this.afterEach;
  },
  
  getBeforeAll : function(){
    return this.beforeAll;
  },
  
  getAfterAll : function(){
    return this.afterAll;
  }
  
};

Inspec.ExampleGroup.addBeforeEach = function(implementation){
  this.lastAddedExamplGroup.addBeforeEach(implementation);
};

Inspec.ExampleGroup.addAfterEach = function(implementation){
  this.lastAddedExamplGroup.addAfterEach(implementation);
};

Inspec.ExampleGroup.addBeforeAll = function(implementation){
  this.lastAddedExamplGroup.addBeforeAll(implementation);
};

Inspec.ExampleGroup.addAfterAll = function(implementation){
  this.lastAddedExamplGroup.addAfterAll(implementation);  
};

Inspec.ExampleGroup.createExampleGroup = function(description, implementation, options){
  options = Inspec.ExampleGroup.ensureShared(options);  
  var exampleGroup = new Inspec.ExampleGroup(description, implementation, options);
  this.addExampleGroupToHierarchy(exampleGroup);  
  exampleGroup.init();
};

Inspec.ExampleGroup.selectHierarchy = function(exampleGroup){
  var runner = Inspec.Runner.getInstance();
  return (exampleGroup.isShared() ? runner.getSharedExampleGroups() : runner.getStandardExampleGroups());
};

Inspec.ExampleGroup.addExampleGroupToHierarchy = function(exampleGroup){
  this.selectHierarchy(exampleGroup).add(exampleGroup);
  this.lastAddedExamplGroup = exampleGroup;
};

Inspec.ExampleGroup.ensureShared = function(options){
  if(this.isLastAddedExampleGroupShared()){
    options = options || {};
    options.shared = true;
  }
  return options;
};

Inspec.ExampleGroup.addSharedExampleGroup = function(){
  this.lastAddedExamplGroup.addSharedExampleGroups.apply(this.lastAddedExamplGroup, arguments);
};

Inspec.ExampleGroup.pushStack = function(exampleGroup){
  this.selectHierarchy(exampleGroup).pushStack(exampleGroup);
};

Inspec.ExampleGroup.popStack = function(exampleGroup){
  return this.selectHierarchy(exampleGroup).popStack();
};

Inspec.ExampleGroup.isLastAddedExampleGroupShared = function(){
  return (this.lastAddedExamplGroup && this.lastAddedExamplGroup.isShared());
};