
    Events = new Meteor.Collection("events");
    Registrations = new Meteor.Collection("registrations");


Meteor.methods({
  // options should include: title, description, x, y, public
  createEvent: function (options) {
  
  	console.log("REACHED CREATE EVENT INSERTING NOW");
  	
    options = options || {};
    
    console.log(options.name);
    
    //second model side validation
    
   return Events.insert({
     name: options.name,
	 tagline: options.tagline,
	 venue: options.venue,
	 description: options.description,
	 capacity: options.capacity,
	 date: options.date,
	 organiser: options.organiser,
	 category: options.category,
	 cost: options.cost,			 
    });
  }
}); //end of methods





Events.allow({

	insert: function(userId, eventElement){
		return true;
	},		
	
	remove: function(userId, eventElement){
		return true;
	}
	
});

/*
Events Model:

Name (String)
Tagline (String)
Venue (String)
Description (String)
Capacity (Number)
Date Of Event (Date)
Organiser (String)
Category (String _predefined)
Cost (Boolean)
*/
/*
Registrations Model:

EventID  (String)
UserID (String)
Date and Time of Registration (Date)
*/

