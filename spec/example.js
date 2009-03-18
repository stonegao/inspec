var strings = [];
with(Inspec.dsl.BDD){

describe("spec for Foo", function(){
  beforeEach(function(){strings.push("foo before each")})  
  beforeAll(function(){strings.push("foo before all")})
  afterEach(function(){strings.push("foo after each")})  
  afterAll(function(){strings.push("foo after all")})
  
  it("should do foo", function(){strings.push("should do foo")})
  it("should do foo2", function(){strings.push("should do foo2")})

  describe("spec for Bar", function(){
    beforeEach(function(){strings.push("bar before each")})
    beforeAll(function(){strings.push("bar before all")})
    afterEach(function(){strings.push("bar after each")})
    afterAll(function(){strings.push("bar after all")})
    
    it("should do bar", function(){strings.push("should do bar")})
    
    describe("spec for Bar2", function(){
      beforeEach(function(){strings.push("bar2 before each")})
      beforeAll(function(){strings.push("bar2 before all")})
      afterEach(function(){strings.push("bar2 after each")})
      afterAll(function(){strings.push("bar2 after all")})
      
      it("should do bar22", function(){strings.push("should do bar 22")})
    })
    itShouldBehaveLike("spec for shared")    
  })
  
  shareExamplesFor("spec for shared", function(){
    beforeEach(function(){strings.push("shared before each")})
    beforeAll(function(){strings.push("shared before all")})
    afterEach(function(){strings.push("shared after each")})
    afterAll(function(){strings.push("shared after all")})
 
    it("should do shared", function(){strings.push("should do shared")})
    
    describe("spec for bla in shared", function(){
      itShouldBehaveLike("shared inside shared")
      
      beforeEach(function(){strings.push("shared bla before each")})
      beforeAll(function(){strings.push("shared bla before all")})
      afterEach(function(){strings.push("shared bla after each")})
      afterAll(function(){strings.push("shared bla after all")})
      
      it("should do bla in shared", function(){strings.push("should do shared bla")})
    })
  })  
})

describe("spec for Goo", function(){
  beforeEach(function(){strings.push("Goo before each")})
  beforeAll(function(){strings.push("Goo before all")})
  afterEach(function(){strings.push("Goo after each")})
  afterAll(function(){strings.push("Goo after all")})
  
  itShouldBehaveLike("spec for shared")
})

shareExamplesFor("shared inside shared", function(){
  beforeEach(function(){strings.push("shared inside shared before each")})
  beforeAll(function(){strings.push("shared inside shared before all")})
  afterEach(function(){strings.push("shared inside shared after each")})
  afterAll(function(){strings.push("shared inside shared after all")})

  it("should do shared inside shared", function(){strings.push("should do shared inside shared")})
})

}

Inspec.ExampleGroup.manager.run();

expected = [ "foo before all", 
  "foo before each", 
  "should do foo", 
  "foo after each", 
  "foo before each", 
  "should do foo2", 
  "foo after each", 
  "foo after all", 
  "foo before all", 
  "bar before all", 
  "foo before each", 
  "bar before each", 
  "should do bar", 
  "bar after each", 
  "foo after each", 
  "bar after all", 
  "foo after all", 
  "foo before all", 
  "bar before all", 
  "bar2 before all", 
  "foo before each", 
  "bar before each", 
  "bar2 before each", 
  "should do bar 22", 
  "bar2 after each", 
  "bar after each", 
  "foo after each", 
  "bar2 after all", 
  "bar after all", 
  "foo after all", 
  "foo before all", 
  "bar before all", 
  "shared before all", 
  "foo before each", 
  "bar before each", 
  "shared before each", 
  "should do shared", 
  "shared after each", 
  "bar after each", 
  "foo after each", 
  "shared after all", 
  "bar after all", 
  "foo after all", 
  "foo before all", 
  "bar before all", 
  "shared before all", 
  "shared bla before all", 
  "foo before each", 
  "bar before each", 
  "shared before each", 
  "shared bla before each", 
  "should do shared bla", 
  "shared bla after each", 
  "shared after each", 
  "bar after each", 
  "foo after each", 
  "shared bla after all", 
  "shared after all", 
  "bar after all", 
  "foo after all", 
  "foo before all", 
  "bar before all", 
  "shared before all", 
  "shared bla before all", 
  "shared inside shared before all", 
  "foo before each", 
  "bar before each", 
  "shared before each", 
  "shared bla before each", 
  "shared inside shared before each", 
  "should do shared inside shared", 
  "shared inside shared after each", 
  "shared bla after each", 
  "shared after each", 
  "bar after each", 
  "foo after each", 
  "shared inside shared after all", 
  "shared bla after all", 
  "shared after all", 
  "bar after all", 
  "foo after all", 
  "Goo before all", 
  "shared before all", 
  "Goo before each", 
  "shared before each", 
  "should do shared", 
  "shared after each", 
  "Goo after each", 
  "shared after all", 
  "Goo after all", 
  "Goo before all", 
  "shared before all", 
  "shared bla before all", 
  "Goo before each", 
  "shared before each", 
  "shared bla before each", 
  "should do shared bla", 
  "shared bla after each", 
  "shared after each", 
  "Goo after each", 
  "shared bla after all", 
  "shared after all", 
  "Goo after all", 
  "Goo before all", 
  "shared before all", 
  "shared bla before all", 
  "shared inside shared before all", 
  "Goo before each", 
  "shared before each", 
  "shared bla before each", 
  "shared inside shared before each", 
  "should do shared inside shared", 
  "shared inside shared after each", 
  "shared bla after each", 
  "shared after each", 
  "Goo after each", 
  "shared inside shared after all", 
  "shared bla after all", 
  "shared after all", 
  "Goo after all"
];
var success = (strings.length == expected.length);

for(var i=0; i< strings.length; i++){
  console.log(strings[i]);
}

if(!success)
  throw "Length dosn't match; expected: " +expected.length + ", got: " + strings.length;
else {
  for(var i=0; i<strings.length; i++){
    if(strings[i] != expected[i])
      throw "On Line " + (i+1) + ": Expected '" + expected[i] + "', but got '" + strings[i] + "'";
  }
}
