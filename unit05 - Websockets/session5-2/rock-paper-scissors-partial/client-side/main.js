// a few shortcuts to important page elements
var notificationBox = document.getElementById("notificationBox");
var scoreDisplay = document.getElementById("scoreDisplay");
var rpsForm = document.getElementById("RPSForm");
var userNameField = document.getElementById("userNameField");
var choiceBox = document.getElementById("choiceBox");

userNameField.value = "user_" + Math.random().toString(16).slice(2, 8);

// the WebSocket itself.
var wsConnection = new WebSocket("ws://localhost:3000");

// this method is not in the official API, but it's very useful.
wsConnection.sendJSON = function (data) {
  this.send(JSON.stringify(data));
};

wsConnection.onopen = function (event) {
  console.log("Socket connection is open!");
};

wsConnection.onclose = function (event) {
  console.log(`Socket connection is closed! ${event.code}, ${event.wasClean}`);

  notification =
    'Connection closed!! <a href="javascript:window.location.reload();">Refresh</a>';
  scoreDisplay.innerHTML = "";
};

wsConnection.onmessage = function (event) {
  console.log("Socket message arrived!", event.data);

  const msg = JSON.parse(event.data);

  let notification = notificationBox.innerHTML;
  let score = scoreDisplay.innerHTML;
  switch (msg.messageType) {
    case "CHOICE ACCEPTED":
      notification = "Your choice is accepted. Waiting for other player.";
      break;
    case "CHOICE NOT ACCEPTED":
      notification = `<b>ALERT:</b> ${msg.reason}`;
      break;
    case "OPPONENT CHOICE":
      notification = `Opponent ${msg.opponentName} submitted a choice.`;
      break;
    case "WIN":
      notification = "You WIN!!!";
      score =
        `${userNameField.value}: ${msg.ownScore}` +
        "&nbsp;&mdash;&nbsp;" +
        `${msg.opponentName}: ${msg.opponentScore}`;
      break;
    case "LOOSE":
      notification = "You LOOSE...";
      score =
        `${userNameField.value}: ${msg.ownScore}` +
        "&nbsp;&mdash;&nbsp;" +
        `${msg.opponentName}: ${msg.opponentScore}`;
      break;
    case "TIE":
      notification = `Tie. Nobody wins or loses. Play a new round.`;
      break;
    case "OPPONENT LEFT":
      notification = `Opponent ${msg.opponentName} left the game.`;
      break;
    default:
      console.log("Unknown messageType:", msg);
  }
  notificationBox.innerHTML = notification;
  scoreDisplay.innerHTML = score;
};

wsConnection.onerror = function (event) {
  alert("There was a connection error!");

  console.log("Socket error!", event);
};

rpsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = {
    messageType: "CHOICE",
    userName: userNameField.value,
    choice: choiceBox.value,
  };
  console.log("SUBMIT", message);
  wsConnection.sendJSON(message);
});
