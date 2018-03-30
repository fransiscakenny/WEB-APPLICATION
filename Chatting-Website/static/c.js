var pageCounter = 1;
var animalContainer = document.getElementById("animal");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'http://localhost:5000/todos')
  //ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json'); //SEND / POST OR RECEIVE DATA / GET
  ourRequest.onload = function() { //What happens when data is loaded
    var ourData = JSON.parse(ourRequest.responseText)
    //console.log(ourData[0])
     renderHTML(ourData);
  };
  ourRequest.send();
});

function renderHTML(data){
  var htmlString = "";
  for (i = 0; i < data.length; i++){
    htmlString += "<p>"+data[i].name+" is a "+data[i].species +".</p>";
  }
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
