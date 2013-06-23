
if (Meteor.isClient) {
  
  
  
// Subscriptions  
Meteor.subscribe("events");
Meteor.subscribe("registrations");

//Router mini-pages

Meteor.Router.add({
	
	'/': 'eventsList',
	'/addNewEvent' : 'eventEntry',
	'/event/:id' : function(id){
		Session.set("currentEventOnDisplay", id);
		return 'singleEvent';
	},    
	
	'*' : '404'
	

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

Template.userLoggedOut.events({
	'click #loginButton': function(e, tmpl){
		Meteor.loginWithFacebook({
			requestPermissions: ['email', 'user_likes']
		}, function(error){
			if (error){
				alert("You need to login  to register for Events, and more!");
			}
			else{
				console.log("Logged In!");
				//Verify with Parse - VITx
						var VITxUser = Parse.Object.extend("VITxMaster");
						var query = new Parse.Query(VITxUser);
						query.equalTo("fbid", "213131");
						
						query.find({
						  success: function(results) {
						  	if (!results.length){
						  		console.log("found results: " + results.length);
							  	//insert the user
							  	var GameScore = Parse.Object.extend("VITxMaster");
								var gameScore = new GameScore();
								gameScore.set("fbid", "213131");
								gameScore.set("registrationNumber", "12MET0000");
								gameScore.set("VITevents", "true");
								gameScore.save(null, {
								  success: function(gameScore) {
								    // Execute any logic that should take place after the object is saved.
								    alert('New object created with objectId: ' + gameScore.id + 'and fbid: ' + gameScore.get("registrationNumber"));
								  },
								  error: function(gameScore, error) {
								    // Execute any logic that should take place if the save fails.
								    // error is a Parse.Error with an error code and description.
								    alert('Failed to create new object, with error code: ' + error.description);
								  }
								});
						  	}
						  	else{
						    	alert("Successfully retrieved " + results.length + " scores.");
								// Do something with the returned Parse.Object values
								var object = results[0];
								if(object.get('VITevents') == "true"){
							      //user is already in VITx, used VITevents before.
							      	alert("User has used VITevents before");
								  	}
								else{
							      //user is in VITx, but not VITevents
							      alert("User has not used VITevents before, but is in VITx. \n\n Setting VITevents flag to true.")
							      var newQuery = new Parse.Query(VITxUser);
							      query.get(object.id, {
									  success: function(object) {
									    // The object was retrieved successfully.
									    object.set("VITevents", "true");
									  },
									  error: function(object, error) {
									    // The object was not retrieved successfully.
									    // error is a Parse.Error with an error code and description.
									    console.log("error in the retriveing object from id");
									  }
									});
						      }//end of small else
						      }// end of big else
						    },
						  error: function(error) {
						    alert("Error: " + error.code + " " + error.message);
						  }
						}); //end of Parse Code
			}
		});
	}
	
});

Template.userLoggedIn.events({
	'click #logoutButton': function(e, tmpl){
		Meteor.logout(function(error){
			if (error){
				alert("Unable to Logout!");
			}
			else{
				console.log("Logged Out!");
			}
		});
	}
	
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
	
	
},

'click .unregister': function(){
		/*
		- Check of logged in properly
		- Fbid and RegNo is set on Parse
		- Register for event (Meteor.call)
		- Push registration to VITNow for the Card
		*/
		Meteor.call("unregisterFromEvent", {
			userId: Meteor.user()._id,
			eventId: Session.get("currentEventOnDisplay")
		}, function(error, party){
			if(!error){
				alert("registration Removed for user: " + Meteor.user().profile.name + " from event: " + Session.get("currentEventOnDisplay"));
			}
			else{
				console.log(error);
			}
		}//end of function error()
	); //end of Meteor call unregisterFromEvent
}


}); //end of singleEvent events

}// end of Meteor.isClient