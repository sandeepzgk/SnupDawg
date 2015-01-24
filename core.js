
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

// Function to trigger connection success.
// Do the main JOBs here!
function onSuccess() {
  debug("connection established");

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
  debug(message.payloadString);
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

function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}
var foo=new Sound("note.mp3",100,false);
function playNotification()
{
	foo.start();

}

function showNotification(str)
{
	
   playNotification();
	$(notification).append( '<div id="note" class="notebox" onClick="$(this).slideUp(500)">'+str+'</div>').children(':last').hide().fadeIn(800,"easeOutBack");
}
