
// Setup your personal infos here:
var API_ID     = 'lg7kkdfayu',
    API_SECRET = 'JRyylHBixS',
    BOARD_ID   = 'SW1H31PJGM';

// Start new websocket istance.
var client = new Messaging.Client("cloud.smartables.io", 8001, RandomClientId());
debug("Client instantiated.");
client.startTrace();
debug("Now trying to connect...");
client.qos = 0;
client.connect({
  useSSL: true,
  userName: API_ID,
  password: API_SECRET,
  onSuccess: onSuccess,
  onFailure: onFailure,
  timeout:10
});
var ledInterval=-1;
// Function to trigger connection success.
// Do the main JOBs here!
function onSuccess() {
  debug("connection established");

  // Sample code for subscribe a specific topic.
  client.subscribe(API_ID+'/'+BOARD_ID+'/SENSE/8');

  // Sample code to emit a websocket message.
  var message = new Messaging.Message(JSON.stringify({
     "foo": "bar"
  }));
  message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1';
  message.qos = 2;
  message.retained = true;
  client.send(message);
  stopLedCycle();
}

// Attach a function when a new message is received.
client.onMessageArrived = function(message) {

  var json=JSON.parse(message.payloadString);
  debug(json.analog);
  if(json.analog <=250)
  {
	showNotification("It's dark out here, lemme bring my swag!","swag");
	
	
  }
  
  
}

// Function to trigger connection error.
function onFailure() {
  debug("connection failure");
}

// Attach a function when connection lost.
client.onConnectionLost = function() {
  debug("connection lost");
}


function debug(mystring)
{
	document.getElementById("debug").innerHTML += "<br/>" + timeConverter((new Date).getTime()) +": "+ mystring;
	var objDiv = document.getElementById("debugcontainer");
	objDiv.scrollTop = objDiv.scrollHeight;
	console.log(mystring);
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
 // var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
 var time = hour + '.' + min + '.' + sec ;
  return time;
}


function playNotification()
{
	tone.play();

}
var notificationType =[];
function showNotification(str,type)
{
   if(notificationType.indexOf(type)==-1)
   {
	   if(type=="swag")
	   {
		startLedCycle();
	   }
	   playNotification();
	   typeString = "'"+type+"'";
	   $(notification).append( '<div class="notebox" onClick="$(this).slideUp(500);removeNotification('+typeString+');" >'+str+'</div>').children(':last').hide().fadeIn(800,"easeOutBack");
	   notificationType.push(type);
	}	
  
}

function removeNotification(type)
{

if(type=="swag")
{
	stopLedCycle();
}
var index = notificationType.indexOf(type);

if (index > -1)
 {
    notificationType.splice(index, 1);
 }
}

function startLedCycle()
{
	ledInterval=setInterval(ledRandom,300);
}
function stopLedCycle()
{
	clearInterval(ledInterval);
	var message = new Messaging.Message(JSON.stringify({
     "rgb":[1,0,0,0]	
  }));
  message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1';
  message.qos = 2;
  message.retained = true;
  client.send(message);
	ledInterval=-1;
}
function ledRandom()
{

	 var message = new Messaging.Message(JSON.stringify({
     "rgb":[1,myRand(),myRand(),myRand()]	
  }));
  message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1';
  message.qos = 2;
  message.retained = true;
  client.send(message);
  
}

function myRand()
{
	return(Number(Math.random()*255));
}