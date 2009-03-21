describe("Matchers", function(){
  describe("TypeMatcher", function(){
    it("should work with String", function(){
      var aString = "abc";
      expect(aString).toBeType("string");
    })
    
    it("should work with Number", function(){
      var aNumber = 123;
      expect(aNumber).toBeType("number");
    })    
    
    it("should work with Object", function(){
      var anObject = {};
      expect(anObject).toBeType("object");
    })    

    it("should work with Boolean", function(){
      var aBoolean = false;
      expect(aBoolean).toBeType("boolean");
    })
    
    it("should work with undefined", function(){
      var undefinedValue;
      expect(undefinedValue).toBeType("undefined");
    })

    it("should work with function", function(){
      var aFunction = function(){};
      expect(aFunction).toBeType("function");
    })          
  })
  
  describe("InstanceMatcher", function(){
    it("should work with String", function(){
      var aString = new String("abc");
      expect(aString).toBeA(String);      
    })
    
    it("should work with Number", function(){
      var aNumber = new Number(123);
      expect(aNumber).toBeA(Number);      
    })
    
    it("should work with a class", function(){
      var Foo = function(){};
      var foo = new Foo();
      expect(foo).toBeA(Foo);      
    })  

    it("should work with a sub-class", function(){
      var Foo = Inspec.Class.extend({});
      var foo = new Foo();
      expect(foo).toBeA(Foo);
      expect(foo).toBeA(Inspec.Class);
      expect(foo).toBeA(Object);
    })        
  })
  
  describe("ComparisonMatcher", function(){
    it("should work with toBeAtLeast", function(){
      expect(5).toBeAtLeast(5);
      expect(6).toBeAtLeast(5);
    })
    
    it("should work with toBeAtMost", function(){
      expect(4).toBeAtMost(5);
      expect(5).toBeAtMost(5);
    })
    
    it("should work with toBeGreaterThan", function(){
      expect(6).toBeGreaterThan(5);
      expect(5).not().toBeGreaterThan(5);
    })
    
    it("should work with toBeLessThan", function(){
      expect(4).toBeLessThan(5);
      expect(5).not().toBeLessThan(5);
    })
  })
  
  describe("RegexMatcher", function(){
    it("should match correct string", function(){
      var emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      var email = "abc@efg.com";
      expect(email).toMatch(emailRegex);
    })
    
    it("should not match incorrect string", function(){
      var emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      var email = "abc_efg.com";
      expect(email).not().toMatch(emailRegex);
    })
  })  
})










