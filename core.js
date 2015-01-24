
// Setup your personal infos here:
var API_ID     = 'lg7kkdfayu',
    API_SECRET = 'JRyylHBixS',
    BOARD_ID   = 'SW1H31PJGM';

// Start new websocket istance.
var client = new Messaging.Client("cloud.smartables.io", 8001, RandomClientId());
console.log("Client instantiated.");
client.startTrace();
console.log("Now trying to connect...");
client.qos = 0;
client.connect({
  useSSL: true,
  userName: API_ID,
  password: API_SECRET,
  onSuccess: onSuccess,
  onFailure: onFailure,
  timeout:10
});

// Function to trigger connection success.
// Do the main JOBs here!
function onSuccess() {
  console.log("connection established");

  // Sample code for subscribe a specific topic.
  client.subscribe(API_ID+'/'+BOARD_ID+'/SENSE/1');

  // Sample code to emit a websocket message.
  var message = new Messaging.Message(JSON.stringify({
     "foo": "bar"
  }));
  message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1';
  message.qos = 2;
  message.retained = true;
  client.send(message);
}

// Attach a function when a new message is received.
client.onMessageArrived = function(message) {
  console.log(message.payloadString);
}

// Function to trigger connection error.
function onFailure() {
  console.log("connection failure");
}

// Attach a function when connection lost.
client.onConnectionLost = function() {
  console.log("connection lost");
}
