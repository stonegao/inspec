Inspec.ExampleGroup = function(description, implementation, shared){
  this.description = description;
  this.implementation = implementation;
  this.examples = [];
  this.shared = false;
  if(shared)
    this.shared = true;
  this.node = null;
};

Inspec.ExampleGroup.prototype = {
  getDescription : function(){
    return this.description;
  },
  
  getImplementation : function(){
    return this.implementation;
  },
  
  getNode : function(){
    return this.node;
  },
  
  getParent : function(){
    var parent = this.getNode().getParent();
    if(parent){
      return parent.getContent();
    }
    return null;
  },
  
  getChildren : function(){
    var scope = {children : []};
    this.getNode().eachChild(function(node){
      this.children.push(node.getContent());
    }, scope);
    return scope.children;
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
  
  isShared : function(){
    return this.shared;
  },
  
  isConcrete : function(){
    return (this.implementation && typeof this.implementation == 'function');
  },  
  
  hasExamples : function(){
    return (this.isConcrete() && this.examples.length > 0);
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
    for(var i=0; i< this.examples.length; i++){
      this.examples[i].run(scope);
    }
  },
  
  addExample : function(example){
    this.examples.push(example);
  }
};

Inspec.ExampleGroup.manager = new Inspec.ExampleGroupManager();

Inspec.ExampleGroup.current = function(){
  return this.manager.currentExampleGroup();
};

Inspec.ExampleGroup.setBeforeEach = function(implementation){
  this.current().setBeforeEach(implementation);
};

Inspec.ExampleGroup.setAfterEach = function(implementation){
  this.current().setAfterEach(implementation);
};

Inspec.ExampleGroup.setBeforeAll = function(implementation){
  this.current().setBeforeAll(implementation);
};

Inspec.ExampleGroup.setAfterAll = function(implementation){
  this.current().setAfterAll(implementation);  
};

Inspec.ExampleGroup.createExampleGroup = function(description, implementation, shared){
  var exampleGroup = new Inspec.ExampleGroup(description, implementation, shared);
  this.manager.add(exampleGroup);
};
