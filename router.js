Router.map(function(){
    
    this.route('appHome', {
  		path: '/'
	});
    
    this.route('eventPage', {
    	path: '/event'
    });

    this.route('newEventForm',{
      path: 'newEvent'
    });
    
  
  

  //404
  this.route('Message', {
	  path: '*',
	  data:{
	  	message: "Can't find the page you're looking for.",
	  	subtitle: "That's a 404.",
	  }
  });
});

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});