/**
 * @class Base class to emulate classical class-based OOP
 */
Inspec.Class = function() {};
Inspec.Class._initializing = false;
Inspec.Class._fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

/**
 * @param {object} base Base class to be extended
 * @return {Inspec.Class} Extended class instance
 */
Inspec.Class.extend = function(base) {
	// Inspired by http://ejohn.org/blog/simple-javascript-inheritance/
	var _super = this.prototype;
	
	Inspec.Class._initializing = true;
	var prototype = new this();
	Inspec.Class._initializing = false;
	
	for(var name in base) {
		prototype[name] = typeof base[name] == 'function' && 
		typeof _super[name] == 'function' && Inspec.Class._fnTest.test(base[name]) ?
		(function(name, fn){
			return function() {
				var tmp = this._super;
				this._super = _super[name];
				var ret = fn.apply(this, arguments);        
				this._super = tmp;
				return ret;
			};
		})(name, base[name]) :
		base[name];
	}

	function Class() {
		if (!Inspec.Class._initializing && this.init)
		  this.init.apply(this, arguments);
	}

	Class.prototype = prototype;
	Class.constructor = Class;
	Class.extend = arguments.callee;
	
	return Class;
};
