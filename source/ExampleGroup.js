Inspec.ExampleGroup = function(description, implementation, options){
  this.description = description;
  this.implementation = implementation;
  this.examples = new Inspec.OrderedHash();
  this.options = options || {};
  this.node = null;
};

Inspec.ExampleGroup.prototype = {
  getDescription : function(){
    return this.description;
  },
  
  getNode : function(){
    return this.node;
  },
  
  getParent : function(){
    var parent = this.getNode().parent;
    if(parent){
      return parent.getExampleGroup();
    }
    return null;
  },
  
  getChildren : function(){
    var scope = {children : []};
    this.getNode().children.each(function(description, node){
      this.children.push(node.getExampleGroup());
    }, scope);
    return scope.children;
  },
  
  hasExamples : function(){
    return (this.examples && this.examples.size() > 0);
  },
    
  run : function(){
    if(this.hasExamples())
    {
      var scope = {};
      this.beforeAllExample(scope);
      this.runExamples(scope);
      this.afterAllExample(scope);
    }
  },
  
  beforeAllExample : function(scope){
    var parent = this.getParent();
    if(parent){
      parent.beforeAllExample(scope);
    }
    if(typeof this.beforeAll == "function")
      this.beforeAll.call(scope);
  },
  
  afterAllExample : function(scope){
    if(typeof this.afterAll == "function")
      this.afterAll.call(scope);
    var parent = this.getParent();
    if(parent){
      parent.afterAllExample(scope);
    }
  },
  
  beforeEachExample : function(scope){
    var parent = this.getParent();
    if(parent){
      parent.beforeEachExample(scope);
    }
    if(typeof this.beforeEach == "function")
      this.beforeEach.call(scope);
  },
  
  afterEachExample : function(scope){
    if(typeof this.afterEach == "function")
      this.afterEach.call(scope);
    var parent = this.getParent();
    if(parent){
      parent.afterEachExample(scope);
    }
  },
  
  runExamples : function(scope){
    this.examples.each(function(description, example){
      example.run(scope);
    }, this);
  },
  
  init : function(){
    if(!this.isConcrete())
      return;
      
    this.pushToStack();
    this.implementation();
    this.popFromStack();
  },
  
  isShared : function(){
    return (this.options.shared ? true : false);
  },
  
  isConcrete : function(){
    return (this.options.concrete ? true : false);
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
  
  setBeforeEach : function(fn){
    this.beforeEach = fn;
  },
  
  setAfterEach : function(fn){
    this.afterEach = fn;
  },
  
  setBeforeAll : function(fn){
    this.beforeAll = fn;
  },
  
  setAfterAll : function(fn){
    this.afterAll = fn;
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

Inspec.ExampleGroup.setBeforeEach = function(implementation){
  this.lastAddedExamplGroup.setBeforeEach(implementation);
};

Inspec.ExampleGroup.setAfterEach = function(implementation){
  this.lastAddedExamplGroup.setAfterEach(implementation);
};

Inspec.ExampleGroup.setBeforeAll = function(implementation){
  this.lastAddedExamplGroup.setBeforeAll(implementation);
};

Inspec.ExampleGroup.setAfterAll = function(implementation){
  this.lastAddedExamplGroup.setAfterAll(implementation);  
};

Inspec.ExampleGroup.createExampleGroup = function(description, implementation, options){
  options = Inspec.ExampleGroup.ensureShared(options);
  var exampleGroup = new Inspec.ExampleGroup(description, implementation, options);
  this.addExampleGroupToHierarchy(exampleGroup);  
  exampleGroup.init();
};

Inspec.ExampleGroup.addSharedExampleGroups = function(shared){
  for(var i=0; i < shared.length; i++) {
    this.createExampleGroup(shared[i], null, {concrete : false});
  }
};

Inspec.ExampleGroup.selectHierarchy = function(exampleGroup){
  var runner = Inspec.Runner.getInstance();
  return (exampleGroup.isShared() ? runner.getSharedExampleGroups() : runner.getStandardExampleGroups());
};

Inspec.ExampleGroup.addExampleGroupToHierarchy = function(exampleGroup){
  var hierarchy = this.selectHierarchy(exampleGroup);
  hierarchy.add(exampleGroup);
  if(exampleGroup.isConcrete())
    this.lastAddedExamplGroup = exampleGroup;
};


Inspec.ExampleGroup.ensureShared = function(options){
  options = options || {};
  if(this.isLastAddedExampleGroupShared()){
    options.shared = true;
  }
  return options;
};



Inspec.ExampleGroup.pushStack = function(exampleGroup){
  this.selectHierarchy(exampleGroup).pushStack(exampleGroup);
};

Inspec.ExampleGroup.popStack = function(exampleGroup){
  return this.selectHierarchy(exampleGroup).popStack();
};

Inspec.ExampleGroup.isLastAddedExampleGroupShared = function(){
  var rv = this.lastAddedExamplGroup && this.lastAddedExamplGroup.isShared();
  rv = rv && this.isLastAddedExampleGroupInStack();
  return rv;
};

Inspec.ExampleGroup.isLastAddedExampleGroupInStack = function(){
  var runner = Inspec.Runner.getInstance();
  var sharedStack = runner.sharedExampleGroups.stack;
  var lastExampleGroupInStack = sharedStack[sharedStack.length - 1];
  return lastExampleGroupInStack === this.lastAddedExamplGroup;
};








