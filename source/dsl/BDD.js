// global functions
function describe(description, implementation){
  Inspec.ExampleGroup.createExampleGroup(description, implementation);
};
  
function shareExamplesFor(description, implementation){
  Inspec.ExampleGroup.createExampleGroup(description, implementation, {shared : true});
};

function it(description, implementation){
  Inspec.Example.createExample(description, implementation);
};

context = describe;

sharedExamplesFor = shareExamplesFor;