Inspec.dsl.BDD = {
  describe : function(description, implementation){
    Inspec.ExampleGroup.createExampleGroup(description, implementation);
  },
  
  shareExamplesFor : function(description, implementation){
    Inspec.ExampleGroup.createExampleGroup(description, implementation, {shared : true});
  },
  
  itShouldBehaveLike : function(description){
    Inspec.ExampleGroup.createExampleGroup(description, null);
  },
  
  expect : function(subject){
    return new Inspec.Expectation(subject);
  },

  it : function(description, implementation){
    Inspec.Example.createExample(description, implementation);
  },
  
  beforeEach : function(implementation){
    Inspec.ExampleGroup.setBeforeEach(implementation);
  },
  
  afterEach : function(implementation){
    Inspec.ExampleGroup.setAfterEach(implementation);
  },
  
  beforeAll : function(implementation){
    Inspec.ExampleGroup.setBeforeAll(implementation);
  },
  
  afterAll : function(implementation){
    Inspec.ExampleGroup.setAfterAll(implementation);
  }  
};

Inspec.dsl.BDD.context = Inspec.dsl.BDD.describe;

Inspec.dsl.BDD.sharedExamplesFor = Inspec.dsl.BDD.shareExamplesFor;
