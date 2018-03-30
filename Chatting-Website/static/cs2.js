var pageCounter = 1;
var animalContainer = document.getElementById("animal");
//var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  //ourRequest.open('GET', 'http://127.0.0.1:5000/cfirst'); //SEND / POST OR RECEIVE DATA / GET
  ourRequest.onload = function() { //What happens when data is loaded
  //var ourData = ourRequest.responseText
  var e = document.getElementById('mess');
  var ourData = e.value;
  //var ourData = JSON.parse(ourRequest.responseText)
    //console.log(ourData[0])
     renderHTML(ourData);
  };
  ourRequest.send();
});

function renderHTML(data){
  var htmlString = "";
  //for (i = 0; i < data.length; i++){
  //  htmlString += "<p>"+data[i].name+" is a "+data[i].species +".</p>";
  //}
  htmlString = data;
  alert(htmlString)
  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}

//var REQ = new XMLHttpRequest();
//REQ.open('GET', 'http://127.0.0.1:5000/chatroomfirst/joyhu/');
//JSON!
/*var chats = [
  {
    "user": "CHATTYKATHY"
    "message": "Welcome to Chatty Kathy!"
  }
];
*/
