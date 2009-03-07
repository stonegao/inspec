Inspec.OrderedHash = function(){
  this.keys = [];
  this.values = [];
  this.mapping = {};
}

Inspec.OrderedHash.prototype = {
  each : function(fn, scope){
    for(var i=0; i< this.size(); i++){
      fn.apply(scope || this, [this.keys[i], this.values[i]]);
    }    
  },
  
  select : function(fn, scope){
    for(var i=0; i< this.size(); i++){
      var rv = fn.apply(scope || this, [this.keys[i], this.values[i]]);
      if(rv){
        return rv;
      }
    }
    return null; 
  },
  
  filter : function(fn,scope){
    var rv = new Inspec.OrderedHash();
    for(var i=0; i< this.size(); i++){
      var v = fn.apply(scope || this, [this.keys[i], this.values[i]]);
      if(v){
        rv.set(v[0], v[1]);
      }
    }
    return rv; 
  },
  
  map : function(fn, scope){
    var rv = new Inspec.OrderedHash();
    for(var i=0; i< this.size(); i++){
      var v = fn.apply(scope || this, [this.keys[i], this.values[i]]);
      rv.set(v[0], v[1]);
    }
    return rv; 
  },
  
  set : function(key, value){
    var oldValue = this.get(key)
    if(!oldValue){
      this.keys.push(key);
      this.values.push(value);
      this.mapping[key] = this.values.length-1;
    } else {
      var index = this.indexOf(oldValue);
      this.values[index] = value;
    }
  },
  
  get : function(key){
    return this.getAt(this.mapping[key]); 
  },
  
  size : function(){
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
    for(var i = 0; i < this.values.length; i++){
      if(this.values[i] == value){
        return i;
      }
    }
    return -1;
  },
  
  removeAt : function(index){
    var key = this.keys[index];
    var value = this.values[index];
    
    delete this.mapping[key];
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
