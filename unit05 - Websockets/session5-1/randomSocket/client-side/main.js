alert(
  "main.js is running, but does not do anything yet.\n" +
    "Use main.js to write the code that connects to the server using WebSocket"
);

var wsConnection; // TODO Create a websocket and store it in this variable

function sendData() {
  var dataObject = {
    userName: document.getElementById("userNameField").value,
    maxValue: parseInt(document.getElementById("maxValueField").value),
  };

  //TODO Send the data to the server using the websocket

  console.log("SENT DATA:", jsonStr);
}

wsConnection.onopen = function (arg) {
  //TODO Complete this event handler
};

wsConnection.onclose = function (arg) {
  //TODO Complete this event handler
};

wsConnection.onmessage = function (arg) {
  //TODO Complete this event handler
};

wsConnection.onerror = function (arg) {
  //TODO Complete this event handler
};

/**
 * Function for adding text to the messageList element on the page
 * @param {String} text: the text to add to the messageList
 */
function addMessageItem(text) {
  var el = document.createElement("li");
  el.innerHTML = text;
  document.getElementById("messageList").appendChild(el);
}

/**
 * Function for handling form submissions
 */
document
  .getElementById("messageForm")
  .addEventListener("submit", function (eventInfo) {
    eventInfo.preventDefault();
    console.log("SUBMIT FORM");
    sendData();
  });
