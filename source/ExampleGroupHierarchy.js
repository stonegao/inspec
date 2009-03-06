Inspec.ExampleGroupHierarchy = function(){
  this.root = new Inspec.ExampleGroupHierarchy.Node();
  this.stack = [];
};

Inspec.ExampleGroupHierarchy.prototype = {
  add : function(exampleGroup){
    var currentNode = this.currentNode();
    var newNode = new Inspec.ExampleGroupHierarchy.Node(exampleGroup, currentNode);    
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
  if(parent){
    this.parent.addChildNode(this);
    if(parent.exampleGroup)
    this.exampleGroup.addParentBeforeAfter(parent.exampleGroup);
  }
};

Inspec.ExampleGroupHierarchy.Node.prototype = {
  // depth first iteration
  each : function(fn, scope){
    fn.call(scope, this.getDescription(), this);
    if(this.children){
      this.children.each(fn, scope);
    }    
  },
  
  addChildNode : function(node){
    this.children.set(node.getDescription(), node);
  },
  
  getDescription : function(){
    return this.getExampleGroup().getDescription();
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