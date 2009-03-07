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
      this.prepare();
      this.execute();
    },
    
    prepare : function() {
      this.standardExampleGroups.each(function(parentDescription, parentNode){
        // find all shared child example groups of the parent example group
        var shared = parentNode.children.filter(function(description, node){
          if(node.getExampleGroup() == description){
            return [description, node];
          }
        }, this);
        
        // modify parent example group so the child example groups are all solidified
        shared.each(function(d,n){
          n.parent.solidifySharedExampleGroup(d);
        }, this);

      }, this);   
    },
    
    execute : function() {
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
