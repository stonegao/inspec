with(Inspec.dsl.BDD){
describe("spec for Foo", function(){
  
  beforeEach(function(){
    console.log("foo before each")
  })
  
  beforeAll(function(){
    console.log("foo before all")
  })
  
  afterEach(function(){
    console.log("foo after each")
  })
  
  afterAll(function(){
    console.log("foo after all")
  })
  
  it("should do foo", function(){
    console.log("should do foo");
  })
  
  it("should do foo2", function(){
    console.log("should do foo2");
  })
  
  describe("spec for Bar", function(){
    beforeEach(function(){
      console.log("bar before each")
    })

    beforeAll(function(){
      console.log("bar before all")
    })

    afterEach(function(){
      console.log("bar after each")
    })

    afterAll(function(){
      console.log("bar after all")
    })
    
    it("should do bar", function(){
      console.log("should do bar");
    })
    
    itShouldBehaveLike("spec for shared")
  })
  
  shareExamplesFor("spec for shared", function(){
    beforeEach(function(){
      console.log("shared before each")
    })

    beforeAll(function(){
      console.log("shared before all")
    })

    afterEach(function(){
      console.log("shared after each")
    })

    afterAll(function(){
      console.log("shared after all")
    })
    
    it("should do shared", function(){
      console.log("should do shared")
    })
    
    describe("spec for bla in shared", function(){
      it("should do bla in shared", function(){
        console.log("shared bla")
      })
    })
  })
  
})

describe("spec for Goo", function(){
    
})
}

Inspec.Runner.getInstance().run();