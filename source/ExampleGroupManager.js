// creates an exmaple group manager
Inspec.ExampleGroupManager = function(){
  this.shared = {}
  this.root = new Inspec.util.TreeNode('root');
  this.current = this.root;
};
  
Inspec.ExampleGroupManager.prototype = {
  // Add an example group to shared for later use if the example group is
  // shared. Add an example group to standard if it is not shared. If the
  // added example group is concrete, we initialize it. If the added example
  // group is not concrete, it will later be solidified using a shared example
  // group.
  add : function(exampleGroup){
    if(exampleGroup.isShared()){
      this.shared[exampleGroup.getDescription()] = exampleGroup;
    } else {
      var newNode = new Inspec.util.TreeNode(exampleGroup.getDescription(), exampleGroup);
      this.current.add(newNode);
      exampleGroup.node = newNode;
      this.initExampleGroup(exampleGroup);
    }
  },
  
  // solidifies a non-concrete example group using a shared example group.
  solidifySharedExampleGroup : function(exampleGroup){
    // do nothing if it is concrete
    if(exampleGroup.isConcrete())
      return;
    
    var sharedExampleGroup = this.shared[exampleGroup.getDescription()];
    exampleGroup.implementation = sharedExampleGroup.implementation;
    this.initExampleGroup(exampleGroup);
  },
  
  // initializes an example group. Do nothing if the example group is not
  // concrete. Because it doesn't have an implementation. It sets the current
  // exaple group first, then runs the implementation of the example group,
  // finally, it sets the current example group to the parent example group.
  initExampleGroup : function(exampleGroup){
    if(!exampleGroup.isConcrete())
      return;

    this.current = exampleGroup.node;
    exampleGroup.implementation();
    this.current = exampleGroup.node.getParent();
  },
    
  // iterate through all example groups, and solidify exmaple groups
  prepare : function() {
    this.root.each(function(node){
      if(node.hasContent() && (!node.getContent().isConcrete()))
        this.solidifySharedExampleGroup(node.getContent());
    }, this);   
  },
  
  // returns the current example group
  currentExampleGroup : function(){
    return this.current.getContent();
  }
};
