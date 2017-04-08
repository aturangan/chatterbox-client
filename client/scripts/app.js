

$(document).ready(function(){
	//put the data (from the global variable) into the message panels
	$(".submit").click(function(){
		// console.log("button");
	  
  });

	$(".dropdown-menu").click('.link', function(event){
		//store the exact room that was clicked 
		clearMessages(); 
		var selectedRoom= event.toElement.innerHTML;
		event.preventDefault(); 
		filterMessages(selectedRoom);
		
		
		//get the messages for the specific room name 
	
  });
});


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




var ajaxFetch = function() {
	$.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/', function(data, status) {
	  console.log(data)

     // data =datas
     allMessages(data);
     
	});
}






// Add friend

//1. take whole message array, use groupby and get the usernames 
// displays those usernames as friendslist
// once the user clicks  and adds a friend, filter the messages from that friend and dispaly to user.




//Javascript
function clearMessages(){
	$("#chats").empty();
}

//tuple or object and add it into allMessages function 
//refer to eachMessage.roomname by (roomname, id); 

function allMessages(messageArray,roomName){
	//Logic to get extract unique roomnames from the array and feed each to renderRoom function
	data= messageArray;
	console.log(messageArray);
	var roomArray = messageArray.results.map(function(eachMessage){
		return eachMessage.roomname;
	});
	roomArray = _.uniq(roomArray);
	//console.log(roomArray);
	roomArray.forEach(function(room){
		renderRoom(room);
	})
}

	//Logic to  filter messages from the array of Messages, based on roomName and feed to renderMessage function
	function filterMessages(roomName){
		var messageArray = data;  
		console.log(messageArray);
	var lobbyMessages= messageArray.results.filter(function(eachMessage){
		return eachMessage.roomname === roomName;
	});
	for (var i = 0; i < lobbyMessages.length; i++) {
		renderMessage(lobbyMessages[i]);
	}

}

function renderMessage(message){
	var innerHTML = "";
	//console.log()	

		var newMessage = $(/*"<tr><td><blockquote><p>*/ "</p></blockquote></td></tr>");
		var userName = $('<small> @<a class ="username"> </a></small>')
		userName.text(message.username);

		newMessage.text(message.text).append(userName);
		/*newMessage +'<small> @<a class ="username">' 
		+ message.username+ "</a></small></p></blockquote></tr></td>";*/
	          
		$("#chats").append(newMessage); 
	}

// done( function( data ) {
//     var a = jQuery( '<a />' );
//     a.attr( 'href', data.url );
//     a.text( data.title );
 
//     jQuery( '#my-div' ).append( a );

function renderRoom(roomName){

	if (roomName !== undefined) {
		//var newRoom= "<li class='link' " + roomName +"><a href='#'>"+ roomName+ "</a></li>";
		//var newRoom= "<li class='link'><a href='#'>"+ roomName+ "</a></li>";
	 var newRoom= $("<li class='link'><a href='#'> </a></li>");
	  newRoom.text(roomName);

// var a = jQuery( '<a />' );
//     a.attr( 'href', data.url );
//     a.text( data.title );
 
//     jQuery( '#my-div' ).append( a );





		//  newRoom.addClass(roomName);
		$("#roomSelect").append(newRoom);
	}
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

