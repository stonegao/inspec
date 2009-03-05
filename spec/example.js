describe("spec for Foo", function(){
  
  it("should do foo", function(){
    console.log("should do foo");
  })
  
  describe("spec for Bar", function(){
    it("should do bar", function(){
      console.log("should do bar");
    })
  })
  
  shareExamplesFor("spec for shared", function(){
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