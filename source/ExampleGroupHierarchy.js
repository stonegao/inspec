Inspec.ExampleGroupHierarchy = function(){
  this.root = new Inspec.ExampleGroupHierarchy.Node();
  this.stack = [];
};

Inspec.ExampleGroupHierarchy.prototype = {
  add : function(exampleGroup){
    var currentNode = this.currentNode();
    var newNode = new Inspec.ExampleGroupHierarchy.Node(exampleGroup, currentNode);
    return;    
  },
  
  currentNode : function(){
    var node = this.root;
    for(var i=0; i < this.stack.length; i++){
      var description = this.stack[i].getDescription();
      node = node.findChildNodeBy(description);
    }    
    return node;
  },
  
  each : function(fn, scope){
    this.root.children.each(function(description, node){
      node.each(fn, scope);
    });
  },
  
  find : function(description){
    var scope = {}
    return this.root.children.select(function(desc, node){
      if(desc == description){
        return node;
      }
    }, this);
  },
  
  currentExampleGroup : function(){
    return this.currentNode().getExampleGroup();
  },
  
  getStack : function(){
    return this.stack;
  },
  
  pushStack : function(exampleGroup){
    this.getStack().push(exampleGroup);
  },
  
  popStack : function(){
    return this.getStack().pop();
  }
};

Inspec.ExampleGroupHierarchy.Node = function(exampleGroup, parent){
  this.exampleGroup = exampleGroup;
  this.parent = parent;
  this.children = new Inspec.OrderedHash();
  if(this.exampleGroup){
    this.exampleGroup.node = this;
  }
  if(parent){
    this.parent.addChildNode(this);
    if(parent.exampleGroup && this.isConcrete()){
      this.exampleGroup.addParentBeforeAfter(parent.exampleGroup);
      
    }
  }
};

Inspec.ExampleGroupHierarchy.Node.prototype = {
  // depth first iteration
  each : function(fn, scope){
    fn.call(scope, this.getDescription(), this);
    if(this.children){
      this.children.each(function(description, node){
        node.each(fn, scope);
      }, this);
    }    
  },
  
  solidifySharedExampleGroup : function(description){
    //get shared example group
    var sharedExampleGroups = Inspec.Runner.getInstance().getSharedExampleGroups();
    var sharedExampleGroupNode = sharedExampleGroups.find(description);
    var sharedExampleGroup = sharedExampleGroupNode.getExampleGroup();
    
    // remove the place holder, but remember the position
    var oldNode = this.children.get(description);
    var index = this.children.indexOf(oldNode);
    this.children.removeAt(index);
    
    // setup the example group from shared
    this.setupStack();
    Inspec.ExampleGroup.lastAddedExamplGroup = this.getExampleGroup();
    Inspec.ExampleGroup.createExampleGroup(description, sharedExampleGroup.implementation);
    this.teardownStack();
    
    // remove from the newly created example from the last position
    //var solidifiedExampleGroup = this.children.removeAt(this.children.size()-1);
    
    // insert it into the original position
    //this.children.set(solidifiedExampleGroup.getDescription(), solidifiedExampleGroup);
  },
  
  setupStack : function(){
    if(this.parent){
      this.parent.setupStack();
    }
    var exampleGroup = this.getExampleGroup();
    if(exampleGroup instanceof Inspec.ExampleGroup){
      exampleGroup.pushToStack();
    }
  },
  
  teardownStack : function(){
    var exampleGroup = this.getExampleGroup();
    if(exampleGroup instanceof Inspec.ExampleGroup){
      exampleGroup.popFromStack();
    }
    if(this.parent){
      this.parent.teardownStack();
    }
  },
  
  addChildNode : function(node){
    this.children.set(node.getDescription(), node);
  },
  
  isConcrete : function(){
    return this.getExampleGroup() instanceof Inspec.ExampleGroup;
  },
  
  getDescription : function(){
    if(this.isConcrete())
      return this.getExampleGroup().getDescription();
    return this.getExampleGroup();
  },
  
  getExampleGroup : function(){
    return this.exampleGroup;
  },
  
  getParent : function(){
    return this.parent;
  },
  
  getChildren : function(){
    return this.children;
  },
  
  findChildNodeBy : function(description){
    var node = this.children.get(description);
    return node;
  }

};
