Inspec.ExampleGroup = Inspec.Class.extend({
  // constructor
  // An example group is concrete if implementation is given. Example groups that
  // are not concrete will later be solidified with the matching shared example 
  // groups. An example group is shared if the shared flag is set. Shared example
  // groups cannot be run directly, and will later become solidified.
  init : function(description, implementation, shared){
    this.description = description;
    this.implementation = implementation;
    this.examples = [];
    this.shared = false;
    if(shared)
      this.shared = true;
    this.node = null;
  },
  
  // returns the description of the example group
  getDescription : function(){
    return this.description;
  },
  
  // returns the implementation of the example group
  getImplementation : function(){
    return this.implementation;
  },
  
  // returns the TreeNode that this example group belongs to.
  // returns null if it doesn't belong a TreeNode. e.g. shared example groups
  getNode : function(){
    return this.node;
  },
  
  // returns the parent example group of this example group
  // returns null if this example group has no parent
  getParent : function(){
    var parent = this.getNode().getParent();
    if(parent){
      return parent.getContent();
    }
    return null;
  },
  
  // returns all child example groups in an array. Return values are in order.
  getChildren : function(){
    var scope = {children : []};
    this.getNode().eachChild(function(node){
      this.children.push(node.getContent());
    }, scope);
    return scope.children;
  },
  
  // returns the before each function
  getBeforeEach : function(){
    return this.beforeEach;
  },
  
  // returns the after each function
  getAfterEach : function(){
    return this.afterEach;
  },
  
  // returns the before all function
  getBeforeAll : function(){
    return this.beforeAll;
  },
  
  // return the after all function
  getAfterAll : function(){
    return this.afterAll;
  },
  
  // sets before each for this example group
  setBeforeEach : function(fn){
    this.beforeEach = fn;
  },
  
  // sets after each for this example group
  setAfterEach : function(fn){
    this.afterEach = fn;
  },
  
  // sets before all for tis example group
  setBeforeAll : function(fn){
    this.beforeAll = fn;
  },
  
  // sets after all for this example group
  setAfterAll : function(fn){
    this.afterAll = fn;
  },
  
  // indicates if this example group is shared
  isShared : function(){
    return this.shared;
  },
  
  // indicates if this example group is concrete
  isConcrete : function(){
    return (this.implementation && typeof this.implementation == 'function');
  },  
  
  //indicates if this example group has any examples
  hasExamples : function(){
    return (this.isConcrete() && this.examples.length > 0);
  },
  
  // add an example to this example group
  addExample : function(example){
    this.examples.push(example);
  }
});

// returns current example group
Inspec.ExampleGroup.current = function(){
  return this.manager.currentExampleGroup();
};

// sets before each for current example group
Inspec.ExampleGroup.setBeforeEach = function(implementation){
  this.current().setBeforeEach(implementation);
};

// sets after each for current example group
Inspec.ExampleGroup.setAfterEach = function(implementation){
  this.current().setAfterEach(implementation);
};

// sets before all for current example group
Inspec.ExampleGroup.setBeforeAll = function(implementation){
  this.current().setBeforeAll(implementation);
};

// sets after all for current example group
Inspec.ExampleGroup.setAfterAll = function(implementation){
  this.current().setAfterAll(implementation);  
};

// creates an exmaple gorup and add it into examplegroup manager
Inspec.ExampleGroup.createExampleGroup = function(description, implementation, shared){
  var exampleGroup = new Inspec.ExampleGroup(description, implementation, shared);
  this.manager.add(exampleGroup);
};
