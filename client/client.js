if (Meteor.isClient) {
  
// Subscriptions  
Meteor.subscribe("events");
  
  
// Event Handlers
  
Template.eventEntry.events({
  
 'click .save' : function(event, template){
	 
	 var eventName = template.find("#name").value;
	 var eventTagline = template.find("#tagline").value;
	 var eventVenue = template.find("#venue").value;
	 var eventDescription = template.find("#description").value;
	 var eventCapacity = template.find("#capacity").value;
	 var eventDate = template.find("#date").value;
	 var eventOrganiser = template.find("#organiser").value;
	 var eventCategory = template.find("#category").value; 
	 var eventCost = template.find("#eventCost").value;
	 if (eventCost == "Free"){
		 eventCost = false;
	 }
	 else{
		 eventCost = true;
	 }
	 
	 Meteor.call('createEvent', {
		 name: eventName,
		 tagline: eventTagline,
		 venue: eventVenue,
		 description: eventDescription,
		 capacity: eventCapacity,
		 date: eventDate,
		 organiser: eventOrganiser,
		 category: eventCategory,
		 cost: eventCost

  }, function (error, party) {
    if (! error) {
     alert("Event Inserted");
    }
  }); //end of Meteor.call("createEvent")
 } //end of 'click .save' event  //put a comma after this for another event
});
	  

  
  Template.hello.greeting = function () {
    return "Welcome to VITevents.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });





}// end of Meteor.isClient