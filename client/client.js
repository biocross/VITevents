
if (Meteor.isClient) {
  
  
  
  
// Subscriptions  
Meteor.subscribe("events");
Meteor.subscribe("registrations");

//Router mini-pages

/*
function setPost(context, page){
	var _id = context.params._id;
	Session.set("event", Events);
}
*/

Meteor.Router.add({
	
	'/': 'eventsList',
	'/addNewEvent' : 'eventEntry',
	'/event/:id' : function(id){
		Session.set("currentEventOnDisplay", id);
		return 'singleEvent';
	},    
	
	'*' : '404'
	

});

Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'user_likes']
  }
});

Meteor.startup(function () {
	Parse.initialize("GipFJJaOci2Ja2kY5ZffNUXC8e0uD5whJi0fQJ6G", "mN8O0l4fU5ZXccph2FRnhOONmXYqnEzpKzwpflMx");
	console.log("Parse Has been Init.");

    $(function () {
        var el = document.createElement("script");
        el.src = "/disqus.js";
        el.type = 'text/javascript';
        $("#my-disqus").prepend(el);
		});

});
  
/*  
// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  
  var TestObject = Parse.Object.extend("User");
  var testObject = new TestObject();
  testObject.save({
	  VITevents : 'true',
	  email : 'sameple@parse.com',
  }, {
  	success: function(object) {
   	 alert("yay! it worked");
   	 }
});
  
  
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

*/
  
  
// Event Handlers

Template.eventsList.EventClass = function(){
	return Events.find({});
}
  
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
	 
	 if(eventName && eventTagline && eventVenue && eventDescription && eventOrganiser && eventCategory){
		 
		 
	 
	 
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
  
  }//end of validation if
  
  else{
	  alert("You are missing required fields.");
  }
  
 } //end of 'click .save' event  //put a comma after this for another event
});



Template.singleEvent.post = function(){
	var eventId = Session.get("currentEventOnDisplay");
	console.log(eventId);
	return Events.find({_id : eventId});
}

Template.singleEvent.registrationStatus = function(){
	
	if(!Registrations.find({$or: [{userId: Meteor.userId(), eventId: Session.get("currentEventOnDisplay")} ]}).count()){
		return false;
	}
	else{
		return true;
	}
}

Template.singleEvent.events({
	'click .register': function(){
		/*
		- Check of logged in properly
		- Fbid and RegNo is set on Parse
		- Register for event (Meteor.call)
		- Push registration to VITNow for the Card
		*/
		Meteor.call("registerForEvent", {
			userId: Meteor.user()._id,
			eventId: Session.get("currentEventOnDisplay")
			//date = Date.now(); done on server now!
		}, function(error, party){
			if(!error){
				alert("Your registration has been accepted!");
			}
			else{
				console.log(error);
			}
		}//end of function error()
	); //end of Meteor call registerForEvent
	
	
}
}); //end of singleEvent events
	  
/*
  
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


*/





}// end of Meteor.isClient