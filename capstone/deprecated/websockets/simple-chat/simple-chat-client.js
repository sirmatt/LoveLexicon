(function () {
  var exampleSocket = new WebSocket("ws://localhost:8080");

  exampleSocket.onmessage = function (event) {
    console.log(event.data);
  };

  $('#message-input').keypress(function (e) {
    if (e.which == 13) {
      var message = $('#message-input').val();
      console.log("Sending: " + message);
      exampleSocket.send(message);
    }
  });
})();

// https://developer.mozilla.org/en-US/docs/WebSockets/Writing_WebSocket_client_applications
// https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference
