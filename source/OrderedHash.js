Inspec.OrderedHash = function(){
  this.keys = [];
  this.values = [];
  this.mapping = {};
}

Inspec.OrderedHash.prototype = {
  add : function(key, value){
    this.keys.push(key);
    this.values.push(value);
    this.mapping[key] = this.values.length-1;
  },
  
  get : function(key){
    return this.getAt(this.mapping[key]); 
  },
  
  length : function(){
    return this.keys.length;
  },
  
  getAt : function(index){
    return this.values[index];
  },
  
  getKeys : function(){
    return this.keys;
  },
  
  getValues : function(){
    return this.values;
  },
  
  keyOf : function(value){
    var index = this.indexOf(value);
    return index == -1 ? null : this.keys[index];
  },
  
  indexOf : function(value){
    for(var i = 0; i < this.values; i++){
      if(this.values[i] == value){
        return i;
      }
    }
    return -1;
  },
  
  removeAt : function(index){
    var key = this.keys[index];
    var value = this.values[index];
    
    delete this.mapping.key;
    this.keys.splice(index, 1);
    this.values.splice(index, 1);
    
    return value;
  },
  
  removeByObject : function(value){
    var index = this.indexOf(value);
    return this.removeAt(index);
  },
  
  removeByKey : function(key){
    var value = this.get(key);
    return this.removeByObject(value);
  }
}
