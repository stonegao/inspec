strings=[];
with(Inspec.dsl.BDD){

describe("spec for Foo", function(){
  beforeEach(function(){strings.push("foo before each")})  
  beforeAll(function(){strings.push("foo before all")})
  afterEach(function(){strings.push("foo after each")})  
  afterAll(function(){strings.push("foo after all")})
  
  it("should do foo", function(){strings.push("should do foo"); expect(true).not().toBeTrue();})
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
