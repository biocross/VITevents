if (Meteor.isServer) {
    

    Meteor.publish("events", function(){
	   return Events.find({}); 
    });
    
    Meteor.publish("registrations", function(){
	    return Registrations.find({});
    });



 




















} //end of Meteor.isServer
