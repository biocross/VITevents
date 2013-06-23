Accounts.loginServiceConfiguration.remove({
	service: "facebook"
});

Accounts.loginServiceConfiguration.insert({
	service: 'facebook',
	appId: '239533019505160',
	secret: '4ddcad2e3a21c853cccb031cc89a9975'
});


Accounts.onCreateUser(function (options, user) {
  try{
	   var accessToken = user.services.facebook.accessToken, result, profile;
	   console.log(user.services.facebook.accessToken);
	   url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken; 
	  
	  result =  Meteor.http.call("GET", url);
	   if (result.error){
		   console.log(result);
	   }
	   profile = _.pick(result.data, "name", "email", "id");
	   console.log(profile.id);
	   user.profile = profile; 	    
	
  }
  catch(e){
	  console.log(e);
  }	
  finally{
	   return user;

  }
});


