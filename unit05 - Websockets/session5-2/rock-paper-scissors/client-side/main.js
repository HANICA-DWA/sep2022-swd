// a few shortcuts to important page elements
var notificationBox = document.getElementById("notificationBox");
var scoreDisplay = document.getElementById("scoreDisplay");
var rpsForm = document.getElementById("RPSForm");
var userNameField = document.getElementById("userNameField");
var choiceBox = document.getElementById("choiceBox");

// the WebSocket itself.
var wsConnection = new WebSocket("ws://localhost:3000");

// this method is not in the official API, but it's very useful.
wsConnection.sendJSON = function (data) {
  this.send(JSON.stringify(data));
};

wsConnection.onopen = function (eventInfo) {
  console.log("Socket connection is open!");
};

wsConnection.onclose = function (eventInfo) {
  console.log(
    "Socket connection is closed!",
    eventInfo.code,
    eventInfo.reason,
    eventInfo.wasClean
  );
};

wsConnection.onmessage = function (eventInfo) {
  console.log("Socket message arrived!", eventInfo.data);

  var message = JSON.parse(eventInfo.data);
  switch (message.messageType) {
    case "CHOICE ACCEPTED":
      notificationBox.innerHTML =
        "Your choice has been registered by the server.";
      break;
    case "CHOICE NOT ACCEPTED":
      alert("Mistake:\n" + message.reason);
      break;
    case "OPPONENT CHOICE":
      notificationBox.innerHTML =
        message.opponentName + " has submitted his/her choice...";
      break;
    case "WIN":
      notificationBox.innerHTML = "YOU WIN!!!!";
      scoreDisplay.innerHTML =
        userNameField.value +
        ": " +
        message.ownScore +
        "&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;" +
        message.opponentName +
        ": " +
        message.opponentScore;
      break;
    case "LOSE":
      notificationBox.innerHTML = "you lost...";
      scoreDisplay.innerHTML =
        userNameField.value +
        ": " +
        message.ownScore +
        "&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;" +
        message.opponentName +
        ": " +
        message.opponentScore;
      break;
    case "TIE":
      notificationBox.innerHTML =
        "A Tie. Nobody wins or loses. Play a new round.";
      break;
    case "OPPONENT LEFT":
      notificationBox.innerHTML =
        "Game Over: " + message.opponentName + " disconnected.";
      break;
    default:
      console.log("Unknown messageType:", message);
  }
};

wsConnection.onerror = function (eventInfo) {
  alert("There was a connection error!");
  console.log("Socket error!", eventInfo);
};

rpsForm.addEventListener("submit", function (eventInfo) {
  eventInfo.preventDefault();
  var theMessage = {
    messageType: "CHOICE",
    userName: userNameField.value,
    choice: choiceBox.value,
  };
  console.log("SUBMIT", theMessage);
  wsConnection.sendJSON(theMessage);
});
