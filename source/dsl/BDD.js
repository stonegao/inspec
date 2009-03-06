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
  },
  
  beforeEach : function(implementation){
    Inspec.ExampleGroup.addBeforeEach(implementation);
  },
  
  afterEach : function(implementation){
    Inspec.ExampleGroup.addAfterEach(implementation);
  },
  
  beforeAll : function(implementation){
    Inspec.ExampleGroup.addBeforeAll(implementation);
  },
  
  afterAll : function(implementation){
    Inspec.ExampleGroup.addAfterAll(implementation);
  },
  
  itShouldBehaveLike : function(){
    Inspec.ExampleGroup.addSharedExampleGroup.apply(Inspec.ExampleGroup, arguments);
  }  
};

Inspec.dsl.BDD.context = Inspec.dsl.BDD.describe;

Inspec.dsl.BDD.sharedExamplesFor = Inspec.dsl.BDD.shareExamplesFor;