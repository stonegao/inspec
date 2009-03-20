var Inspec={};
Inspec.util = {};
Inspec.reporters = {};
Inspec.matchers = {};
Inspec.reporters = {};
Inspec.dsl = {};

Inspec.root = this;

Inspec.run = function(options){
  if(options) Inspec.options = options;
  var env = Inspec.Environment.getInstance();
  env.runSpec();
}
