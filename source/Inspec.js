var Inspec={};
Inspec.util = {};
Inspec.reporters = {};
Inspec.matchers = {};
Inspec.reporters = {};
Inspec.dsl = {};
Inspec.options = {};
Inspec.root = this;

Inspec.load = function(){
  var files = [];
  while(arguments.length){
    var temp = Array.prototype.shift.call(arguments);
    if(typeof temp == "array"){
      files = files.concat(temp);
    } else if(typeof temp == "string"){
      files.push(temp);
    }
  }

  var env = Inspec.Environment.getInstance();
  for(var i=0; i< files.length; i++){
    env.load(files[i]);
  }
  return this;
};

Inspec.run = function(){
  var env = Inspec.Environment.getInstance();
  env.run();
}
