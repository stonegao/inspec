// should not be singleton class
// used for easier test later
// makes more sense to rename it to something makes more sense
Inspec.ExampleGroupManager = function(){
  this.shared = {}
  this.root = new Inspec.TreeNode('root');
  this.current = this.root;    
};
  
Inspec.ExampleGroupManager.prototype = {
  // public
  add : function(exampleGroup){
    if(exampleGroup.isShared()){
      this.shared[exampleGroup.getDescription()] = exampleGroup;
    } else {
      var newNode = new Inspec.TreeNode(exampleGroup.getDescription(), exampleGroup);
      this.current.add(newNode);
      this.initExampleGroup(exampleGroup);
    }
  },
  
  // protected
  solidifySharedExampleGroup : function(exampleGroup){
    // do nothing if it is concrete
    if(exampleGroup.isConcrete())
      return;
    
    var sharedExampleGroup = this.shared[exampleGroup.getDescription()];
    exampleGroup.implementation = sharedExampleGroup.implementation;
    this.initExampleGroup(exampleGroup);
  },
  
  // protected
  initExampleGroup : function(exampleGroup){
    if(!exampleGroup.isConcrete())
      return;

    this.current = exampleGroup.node;
    exampleGroup.implementation();
    this.current = exampleGroup.node.getParent();
  },
  
  // public
  run : function(){
    this.prepare();
    this.execute();
  },
  
  // protected
  prepare : function() {
    this.root.each(function(node){
      if(node.hasContent() && (!node.getContent().isConcrete()))
        this.solidifySharedExampleGroup(node.getContent());
    }, this);   
  },
  
  // protected
  execute : function() {
    this.root.each(function(node){
      if(node.hasContent())
        node.getContent().run();
    }, this);    
  },
  
  // public
  currentExampleGroup : function(){
    return this.current.getContent();
  }
};
