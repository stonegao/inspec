// singleton class
Inspec.Runner = function(){
  // Private Runner class
  // so no one can call the constructor
  var Runner = function(){
    this.sharedExampleGroups = new Inspec.ExampleGroupHierarchy();
    this.standardExampleGroups = new Inspec.ExampleGroupHierarchy();    
  };
  
  Runner.prototype = {
    getStandardExampleGroups : function(){
      return this.standardExampleGroups
    },
    
    getSharedExampleGroups : function(){
      return this.sharedExampleGroups;
    },
    
    run : function(){
      this.standardExampleGroups.each(function(description, node){
        node.getExampleGroup().run();
      }, this);
    }
  };
  
  var instance = null;
    
  return {
    getInstance : function(){
      if(!instance){
        instance = new Runner();
      }
      return instance;
    }
  }
  
}();