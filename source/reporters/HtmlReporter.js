Inspec.HtmlReporter = Inspec.Reporter.extend({
  onStartTest : function(message){
    this.document = Inspec.root.document;
    var body = this.document.getElementsByTagName('body')[0];
    var viewport = this.document.createElement('div');
    viewport.id = "inspec";
    body.appendChild(viewport);
    this.viewport = viewport;
  },
  
  onEndTest : function(message){
    console.log("End Test");
  },
  
  onStartExampleGroup : function(message){
  },
  
  onEndExampleGroup : function(message){
  },
  
  onStartExample : function(message){
  },
  
  onEndExample : function(message){
    var example = message.example;
    var success = message.success;
    var error = message.error;
    var description = this.getDescription(message.example);
    
    var result = this.document.createElement('div');
    var title = this.document.createElement('div');
    title.setAttribute("class", "title");
    title.innerHTML = description;
    result.appendChild(title);

    if(success){
      result.setAttribute("class", "success");
    }
    else{
      if(error instanceof Inspec.ExpectationFailure){
        result.setAttribute("class", "failure");
      } else if(error instanceof Error){
        result.setAttribute("class", "error");
      }
      var explanation = this.document.createElement('div');
      explanation.setAttribute("class", "explanation");
      explanation.innerHTML = error.toString();
      result.appendChild(explanation);
    }
    this.viewport.appendChild(result);
  },
  
  getExampleGroupDescription : function(exampleGroup){
    var parent = exampleGroup.getParent();
    var description = exampleGroup.getDescription();
    if(parent)
      description = this.getExampleGroupDescription(parent) + " " + description;
    return description;
  },
  
  getDescription : function(example){
    var desc =  this.getExampleGroupDescription(example.exampleGroup)
      + " " + example.getDescription();
    return desc;
  }
});
