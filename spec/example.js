describe("Inspec", function(){

  it("should work", function(){
    expect(true).toBeTrue();
  })
  
  it("should fail", function(){
    expect(true).not().toBeTrue();
  })
  
  describe("with a nested example group", function(){
    
    it("should work as a nested example group", function(){
      expect(true).toBeTrue();
    })
  })
  
  itShouldBehaveLike("a shared example group");
    
})

sharedExamplesFor("a shared example group", function(){

  it("should work as shared example", function(){
    expect(true).toBeTrue();
  })
  
  describe("with nested example groups in shared", function(){
    
    it("should work as a nested example group in shared", function(){
      expect(true).toBeTrue();
    })
  })
  
})
