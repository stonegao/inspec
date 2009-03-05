Inspec.ExampleGroup = function(description, implementation, options){
  this.description = description;
  this.implementation = implementation;
  this.examples = {};
  this.options = options || {};
};

Inspec.ExampleGroup.prototype = {
  getDescription : function(){
    return this.description;
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
    this.examples[example.getDescription()] = example;
  },
  
  pushToStack : function(){
    Inspec.ExampleGroup.pushStack(this);
  },
  
  popFromStack : function(){
    Inspec.ExampleGroup.popStack(this);
  }
}

// root example groups
Inspec.ExampleGroup.standard = new Inspec.ExampleGroupHierarchy();
Inspec.ExampleGroup.shared = new Inspec.ExampleGroupHierarchy();

Inspec.ExampleGroup.createExampleGroup = function(description, implementation, options){
  options = Inspec.ExampleGroup.ensureShared(options);  
  var exampleGroup = new Inspec.ExampleGroup(description, implementation, options);
  this.addExampleGroupToHierarchy(exampleGroup);  
  exampleGroup.init();
};

Inspec.ExampleGroup.selectHierarchy = function(exampleGroup){
  return (exampleGroup.isShared() ? this.shared : this.standard);
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

Inspec.ExampleGroup.pushStack = function(exampleGroup){
  this.selectHierarchy(exampleGroup).pushStack(exampleGroup);
};

Inspec.ExampleGroup.popStack = function(exampleGroup){
  return this.selectHierarchy(exampleGroup).popStack();
};

Inspec.ExampleGroup.isLastAddedExampleGroupShared = function(){
  return (this.lastAddedExamplGroup && this.lastAddedExamplGroup.isShared());
};