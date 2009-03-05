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
  if(parent)
    this.parent.addChildNode(this);
};

Inspec.ExampleGroupHierarchy.Node.prototype = {
  addChildNode : function(node){
    this.children.add(node.getDescription(), node);
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