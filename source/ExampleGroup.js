Inspec.ExampleGroup = function(description, implementation){
  this.description = description;
  this.implementation = implementation;
};

Inspec.ExampleGroup.prototype = {
  getDescription : function(){
    return this.description;
  },
  
  init : function(){
    this.implementation();
  }  
}

// root example groups
Inspec.ExampleGroup.roots = {};
Inspec.ExampleGroup.shared = {};
Inspec.ExampleGroup.stack = [];

Inspec.ExampleGroup.createExampleGroup(description, implementation){
  var exampleGroup = new Inspec.ExampleGroup(description, implementation);
  this.addExampleGroupToHierarchy(exampleGroup);

  this.stack.push(exampleGroup);
  exampleGroup.init();
  this.stack.pop(exampleGroup);
},

Inspec.ExampleGroup.addExampleGroupToHierarchy = function(exampleGroup){
  var node = this.stack;
  for(var i=0; i< this.stack.length; i++){
    node = node[this.stack[i].getDescription()];
  }
  node[exampleGroup.getDescription()] = exampleGroup;
}