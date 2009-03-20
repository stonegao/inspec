describe("Foo") do
  before :each do
  end
  
  before :all do
    throw "error"
  end
  
  after :each do
  end
  
  after :all do
  end
  
  it "should do foo" do
    true.should == true
  end
  
  share_examples_for("Shared") do
    before :each do
    end

    before :all do
    end

    after :each do
    end

    after :all do
    end
    
    it "should do shared" do
      true.should == true
    end

    it "should do shared2" do
      true.should == true
    end
  end
  
  describe("Bar") do
    before :each do
    end

    before :all do
    end

    after :each do
    end

    after :all do
    end
    
    it "should do bar" do
      true.should == true
    end

    it "should do bar2" do
      true.should == true
    end
    
    it_should_behave_like "Shared"
  end
end
