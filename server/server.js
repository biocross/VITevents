/* VITevents Meteor JS - Notes
** Siddharth Gupta 2013 **

- Add reCaptcha wherever required


*/
if (Meteor.isServer) {

    

    Meteor.publish("events", function(){
	   return Events.find({}); 
    });



 




















} //end of Meteor.isServer
