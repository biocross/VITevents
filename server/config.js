Accounts.onCreateUser(function (options, user) {
  try{
	   var accessToken = user.services.facebook.accessToken, result, profile;
	   console.log(user.services.facebook.accessToken);
	   url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken; 
	  
	  result =  Meteor.http.call("GET", url);
	   if (result.error){
		   console.log(result);
		   console.log("errorrrrrrrrrrrr");
	   }
	   profile = _.pick(result.data, "name", "email", "id");
	    
	    //Parse:
	
	  user.profile = profile;
  }
  catch(e){
	  console.log(e);
  }	
  finally{
	   return user;

  }
});


