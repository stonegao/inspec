Inspec.Example = Inspec.Class.extend({
  // constructor
  init : function(exampleGroup, description, implementation, options){
    this.exampleGroup = exampleGroup;
    this.description = description;
    this.implementation = implementation;
    this.options = options;
  },
  
  // returns the description of this example
  getDescription : function(){
    return this.description;
  } 
});

// creates a new example and adds it to the current example group
Inspec.Example.createExample = function(description, implementation){
  var currentExampleGroup = Inspec.ExampleGroup.current();
  if(!currentExampleGroup){
    throw new Error("Cannot Create examples outside of ExampleGroup!");
  }
  var example = new Inspec.Example(currentExampleGroup, description, implementation);
  currentExampleGroup.addExample(example);
};
