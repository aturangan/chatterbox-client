




//now we need to create the message panels
var data; 
var ajaxPost;


//declares a variable data in the global scope, TO BE ASSIGNED in the "success: function (data)"******
//so that we can assign the server data to the global scope 


ajaxPost= function (messageObject) {

	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
	  type: 'POST',

	  //the data that we are sending to the server, hence the message 
	  data: JSON.stringify(messageObject),
	  contentType: 'application/json',

	  //the orange data is the data that the server sends back 
	  success: function (data) {

	  	//***** assigning data from the server to the global variable data
	  	 data = data; 
	  	console.log(data );


	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message', data);
	  }
	});
}

	$("button").click(function(){
	    	getData();
  });



var ajaxFetch = function() {
	$.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/', function(data, status) {
     allMessages(data);
     
	});
}


//put the data (from the global variable) into the message panels 

/**************Display each message function**********************/
$.fn.loadMessages=function(Messages){
  var innerHTML = "";
  var message= "Hello";
  var user= "ABC";
  //Formatting each tweet as blockquote and formatting other details     
        
  var newMessage = "<tr><td><blockquote><p>" + message +'<small> @<a class ="username">'
                   + user +"</a></small></p></blockquote></tr></td>";
  innerHTML += newMessage;  
  console.log(Messages);
  return this.html(innerHTML);
 };
$("table#dynamicTable").loadMessages();






// Add friend

//1. take whole message array, use groupby and get the usernames 
// displays those usernames as friendslist
// once the user clicks  and adds a friend, filter the messages from that friend and dispaly to user.




//Javascript
function clearMessages(){
	$("#chats").empty();
}

function allMessages(messageArray){
		var lobbyMessages= messageArray.results.filter(function(eachMessage){
		return eachMessage.roomname === "lobby";
	});
	for (var i = 0; i < lobbyMessages.length; i++) {
		renderMessage(lobbyMessages[i]);
	}

}

function renderMessage(message){
	var innerHTML = "";
	//console.log()	

		var newMessage = "<tr><td><blockquote><p>" + message.text +'<small> @<a class ="username">' 
		+ message.username+ "</a></small></p></blockquote></tr></td>";
	                    ;
		$("#chats").append(newMessage); 

	}



function renderRoom(roomName){
	var newRoom= "<li><a href='#'>"+ roomName+ "</a></li>";
	$("#roomSelect").append(newRoom);
}



var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var app = {

  "init": function(){

	 },

	 "server": 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',

	 "send": ajaxPost,

	 "fetch": ajaxFetch,

	 "clearMessages": clearMessages,

	 "renderMessage": renderMessage,

	 "renderRoom": renderRoom,


}

var Chatterbox = function() {
	this.app = app;  



}
//app.send();
app.fetch();

//console.log('SERVER DATA', data); 
