describe("Foo") do
  before :each do
    puts "foo before each"
  end
  
  before :all do
    puts "foo before all"
  end
  
  after :each do
    puts "foo after each"
  end
  
  after :all do
    puts "foo after all"
  end
  
  it "should do foo" do
    puts "should do foo"
    true.should == true
  end
  
  share_examples_for("Shared") do
    before :each do
      puts "shared before each"
    end

    before :all do
      puts "shared before all"
    end

    after :each do
      puts "shared after each"
    end

    after :all do
      puts "shared after all"
    end
    
    it "should do shared" do
      puts "should do shared"
      true.should == true
    end

    it "should do shared2" do
      puts "should do shared2"
      true.should == true
    end
  end
  
  describe("Bar") do
    before :each do
      puts "bar before each"
    end

    before :all do
      puts "bar before all"
    end

    after :each do
      puts "bar after each"
    end

    after :all do
      puts "bar after all"
    end
    
    it "should do bar" do
      puts "should do bar"
      true.should == true
    end

    it "should do bar2" do
      puts "should do bar2"
      true.should == true
    end
    
    it_should_behave_like "Shared"
  end
end