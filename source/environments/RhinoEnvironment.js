Inspec.RhinoEnvironment = Inspec.Environment.extend({
  reporterClass : function(){
    return Inspec.ConsoleReporter;
  },
	
  loadFile : function(location){
    return readFile(location);
  }
});