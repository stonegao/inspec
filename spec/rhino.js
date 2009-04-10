load("../source/Inspec.js");
load("../source/Class.js");
load("../source/util/TreeNode.js");
load("../source/util/Messenger.js");
load("../source/dsl/BDD.js");
load("../source/Example.js");
load("../source/ExampleGroupManager.js");
load("../source/ExampleGroup.js");
load("../source/Runner.js");
load("../source/reporters/Reporter.js");
load("../source/reporters/ConsoleReporter.js");
load("../source/Exceptions.js");
load("../source/Expectation.js");
load("../source/matchers/Matcher.js");
load("../source/matchers/ComparisonMatcher.js");
load("../source/matchers/EqualityMatcher.js");
load("../source/matchers/IdentityMatcher.js");
load("../source/matchers/InclusionMatcher.js");
load("../source/matchers/InstanceMatcher.js");
load("../source/matchers/RangeMatcher.js");
load("../source/matchers/RegexMatcher.js");
load("../source/matchers/TypeMatcher.js");
load("../source/environments/Environment.js");
load("../source/environments/BrowserEnvironment.js");
load("../source/environments/RhinoEnvironment.js");


Inspec
  .load('example.js', 'matchersSpec.js')
  .run();