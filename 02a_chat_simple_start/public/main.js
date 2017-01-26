var app = app || {};

app.main = (function() {
  console.log('Your code starts here!');

  // Initialize variables
  var socket = io();
  var username;
  var connected = false;

  // All socket listeners go here
 var socketSetup = function(callback){
    // Socket events
    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
      connected = true;
      // Display the welcome message
      log("Welcome to Socket.IO Chat");
      addParticipantsMessage(data);
    }); //writes in the log by calling the function 'log'
     //calls the variable add participant message to pass the data

    
 socket.on('user joined', function(data)){
    log(data.username + ' just joined');
      addParticipantsMessage(data);
 });

    // Call attachEvents
    callback();
  };
  // Log a message
  var log = function(message) { //tries to append whatever the text is. you create a function to be called over and over again
    var $el = $('<li>').addClass('log').text(message);
    $('.messages').append($el);
    scrollToTop();
  }

  var addParticipantsMessage = function(data){
    var message= ''; //our local variable
    if(data.numUsers===1){
      message += "oh no you're alone, invite some friends";
    } else{
      message +="there are" +data.numUsers + "participants.";
      ///data from the client side.
  }
  log(message);
}

  // Keyboard events
  var attachEvents = function(){
    $('.usernameInput').keypress(function(e){
      if(e.eyCode==13){
        username = $('.usernameInput').val();

        if(username) {
          $('.login.page').fadeOut(); //fading out
          $('.chat,page').show(); //how you show and hide in jquery
           //tell the sever their user name 
          socket.emit('add user', username);
        }
      }
    })

  };

  var init = function(){
    console.log('Initializing app.');
    socketSetup(attachEvents);  // Sending attachEvents as a callback
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);