Inspec.messenger = new Inspec.util.Messenger();
Inspec.ExampleGroup.manager = new Inspec.ExampleGroupManager();
Inspec.reporter = new Inspec.HtmlReporter(Inspec.messenger);
Inspec.runner = new Inspec.Runner(Inspec.ExampleGroup.manager.root, Inspec.messenger);
