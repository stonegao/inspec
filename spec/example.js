A = Inspec.Runner.getInstance().standardExampleGroups.root.children.values;
B = Inspec.Runner.getInstance().standardExampleGroups.stack;
with(Inspec.dsl.BDD){

describe("spec for Foo", function(){
  beforeEach(function(){console.log("foo before each")})  
  beforeAll(function(){console.log("foo before all")})
  afterEach(function(){console.log("foo after each")})  
  afterAll(function(){console.log("foo after all")})
  
  it("should do foo", function(){console.log("should do foo")})
  it("should do foo2", function(){console.log("should do foo2")})

  describe("spec for Bar", function(){
    itShouldBehaveLike("spec for shared")    
    beforeEach(function(){console.log("bar before each")})
    beforeAll(function(){console.log("bar before all")})
    afterEach(function(){console.log("bar after each")})
    afterAll(function(){console.log("bar after all")})
    
    it("should do bar", function(){console.log("should do bar")})
    
    describe("spec for Bar2", function(){
      beforeEach(function(){console.log("bar2 before each")})
      beforeAll(function(){console.log("bar2 before all")})
      afterEach(function(){console.log("bar2 after each")})
      afterAll(function(){console.log("bar2 after all")})
      
      it("should do bar22", function(){console.log("should do bar 22")})
    })
  })
  
  shareExamplesFor("spec for shared", function(){
    beforeEach(function(){console.log("shared before each")})
    beforeAll(function(){console.log("shared before all")})
    afterEach(function(){console.log("shared after each")})
    afterAll(function(){console.log("shared after all")})
 
    it("should do shared", function(){console.log("should do shared")})
    
    describe("spec for bla in shared", function(){
      itShouldBehaveLike("shared inside shared")
      
      beforeEach(function(){console.log("shared bla before each")})
      beforeAll(function(){console.log("shared bla before all")})
      afterEach(function(){console.log("shared bla after each")})
      afterAll(function(){console.log("shared bla after all")})
      
      it("should do bla in shared", function(){console.log("should do shared bla")})
    })
  })  
})

describe("spec for Goo", function(){
  beforeEach(function(){console.log("Goo before each")})
  beforeAll(function(){console.log("Goo before all")})
  afterEach(function(){console.log("Goo after each")})
  afterAll(function(){console.log("Goo after all")})
  
  itShouldBehaveLike("spec for shared")
})

shareExamplesFor("shared inside shared", function(){
  beforeEach(function(){console.log("shared inside shared before each")})
  beforeAll(function(){console.log("shared inside shared before all")})
  afterEach(function(){console.log("shared inside shared after each")})
  afterAll(function(){console.log("shared inside shared after all")})

  it("should do shared inside shared", function(){console.log("should do shared inside shared")})
})

}

Inspec.Runner.getInstance().run();
