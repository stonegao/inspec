Inspec.dsl = {};

Inspec.dsl.BDD = {
  describe : function(description, implementation){
    Inspec.ExampleGroup.createExampleGroup(description, implementation);
  },
  
  shareExamplesFor : function(description, implementation){
    Inspec.ExampleGroup.createExampleGroup(description, implementation, {shared : true});
  },

  it : function(description, implementation){
    Inspec.Example.createExample(description, implementation);
  }
};

Inspec.dsl.BDD.context = Inspec.dsl.BDD.describe;

Inspec.dsl.BDD.sharedExamplesFor = Inspec.dsl.BDD.shareExamplesFor;