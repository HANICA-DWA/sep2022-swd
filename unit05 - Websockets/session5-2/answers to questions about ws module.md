# Answers to questions about ws module

## 1. How do you install an event listener for the typical web-socket events `open`, `message`, and `close`?

There are tree options. One looks like the regular way to install event listeners in Node.JS:

```js
myWebSocket.on("open", function () {
  /* this is the event listener */
});
myWebSocket.on("message", function (data) {
  /* this is the event listener */
});
myWebSocket.on("close", function (code) {
  /* this is the event listener */
});
```

The second way that is supported by `ws` is made to look like how it would work in a web browser. This allows you to copy-paste (some) WebSocket code from a browser app to a Node app that uses `ws`:

```js
myWebSocket.onopen = function (openEventInfo) {
  /* this is the event listener */
};
myWebSocket.onmessage = function (messageEventInfo) {
  /* this is the event listener */
};
myWebSocket.onclose = function (closeEventInfo) {
  /* this is the event listener */
};
```

The existence of these last methods (`onopen()`, `onclose()` etc.) is documented in [ws.md](https://github.com/websockets/ws/blob/master/doc/ws.md), but you have to examine the source file (WebSocket.js) to confirm that the event listeners are actually receiving event-objects (like the client-side DOM versions they emulate).  
The first version (`on("open", cb)` etc.) is, judging from the examples in the main README file for `ws`, the idiomatic one ("idiomatic" = most often used, most easily recognized by others, recommended).

Finally, you can also use `addEventListener(eventname, callback)` instead of `on(eventname, callback)`. This is quite unusual when using the `ws`-module.

## 2. Does `ws` have a built-in facility to convert objects and arrays automatically to JSON?

No, it doesn't. You have to use `JSON.parse` and `JSON.stringify` to send JSON using `ws`.

## 3. What is the name of the event you have to listen for to detect new browsers trying to start communicating over the WebSocket protocol? On what kind of object (server or socket) do you have to install this event listener?

It is the `connection` event. This event is _not_ emitted by a WebSocket, but by the _WebSocketServer_. For every new connection, a new WebSocket object is created, and passed as a parameter to the event listener for the `connection` event.

```js
myWebSocketServer.on("connection", function (aNewWebSocket) {
  /* Here you can install listeners for open/close/message/error events on the new WebSocket */
});
```

## 4. Incoming messages cause 'message' events to be emitted on a WebSocket object. How does your code get access to such a WebSocket object?

See the answer to the previous question. You receive a new WebSocket object for each new connection that is created when a browser sends a request to that effect. The WebSocket object is handed to the programmer as a parameter to the `connection` event listener.

## 5. How can you specify what the URL should be that clients must use to connect to your WebSocket Server?

When creating the WebSocketServer, add the `path` field to the configuration options. Like this:

```js
var myWebSocketServer = new ws.Server({
  server: theHttpServer,
  path: "/myWebSocketPath/version2",
});
```

## 6. If you want to send a message to all browsers that are connected to a WebSocketServer (broadcasting, like the RandomSocket app did), how would you program that?

The WebSocketServer object will have a field called `clients`. It refers to an collection with WebSocket objects for all connected clients.

The `ws` module _does not use an array_ to store socket-objects: `clients` is an instance of the Javascript [class Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). This is a datastructure that was added in ES2015, a.k.a. ES6, together with its sister [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). A Set maintains a collection of any kind of item with the special feature that _a Set will contain any item only once_. If you try to add an item for a second time, it will simply not be added, because it is already in the Set. In contrast to similar datastructures in other languages, ES2015 Sets _do remember the order_ in which items were inserted: If you convert a Set to an array, or use their `forEach()` method, you get the items in "insertion order".

Here is a [quick introduction to Sets](https://alligator.io/js/sets-introduction/) (there's also [one for Maps](https://alligator.io/js/maps-introduction/)). Just reading the source code examples in this introduction should be enough to get you started.  
The intro does not show how to convert a Set into an array, which is useful if you want to easily get the first or the 100th item in the Set. in the assignment for this session. Here are four ways, that use _destructuring_:

```js
const myClientsSet = myWebSocketServer.clients;
// Using the Set-instance in the ws-module.

const clientsArray1 = Array.from(myClientsSet);
// clientsArray1 will be a normal JS array.

const [...clientsArray2] = myClientSet;
// clientsArray2 will be a normal JS array. This uses
// destructuring with the ... operator to catch all
// elements in the Set.

const [clientSocket1, clientSocket2, ...rest] = myClientSet;
// client1 will be first client in Set, client2 the second,
// and rest will be a normal JS array containing all the
// others in the Set.
// client1 and client2 will be instances of WebSocket.

const [clientSocket1, clientSocket2] = myClientSet;
// client1 is first client in Set, client2 the second.
// The rest is ignored. This also works if you have more
// than two items in the Set.
```

You can broadcast by sending a message on each of the WebSocket objects in the `clients` array. Like this:

```js
for (const clientSocket of myWebSocketServer.clients) {
  client.send(message);
}
```

## 7. When a WebSocket message is received, how can your code access the exact message text that was sent by the client?

If you installed your event listener using the regular Node.JS syntax:

```js
socket.on("message", function (data) {
  /* .... */
});
```

the message is passed as the first parameter to the callback function (the parameter is called `data` in the example above).

## 8. Can `ws` only be used as a WebSocketServer, or is it also possible to use it as a WebSocket client (i.e. make your Node.JS app act as a WebSocket client to some other server)?

The first few examples on the main README page for `ws` describe it's use a a client library. Using `ws` as a client library does not mean that you would use in in a browser. The `ws` library is for Node.JS only. But you can have _your_ Node.JS app act a a client to the real-time API of some other server.

## 9. Perhaps your server does not want to accept all incoming connection requests. Maybe you want to handle only a certain number of clients, or you want the connecting request to have some security code in it's URL, or you only want to accept connections between 9:00 AM and 5:00 PM. What feature of `ws` should you use to tell `ws` to accept or refuse an incoming request?

This is badly documented in `ws.md`: In the [list of options](https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback) you can use when creating a WebSocketServer instance, you'll find an option called 'verifyClient' that you _can_ use for this purpose, but they also say that you shouldn't. They refer to a few examples, including [this one](https://github.com/websockets/ws/issues/377#issuecomment-462152231) and [this one](https://github.com/websockets/ws#client-authentication). Both of these examples install an event listener on the _HTTP server_ for the 'upgrade'-event. This event is emitted when a browser asks the HTTP-server to set-up a websocket connection. It is in this event listener that your code can make decisions about accepting or rejecting these set-up requests. Note \_\_ things about this solution:

1. The event listener is installed on the _HTTP server_, not the WebSocketServer.
2. The WebSocketServer is created _without_ hooking it up to the HTTP-server. The hookup is implemented in the code for the event listener for the 'upgrade' event.
3. When the event listener decides that it wants to refuse the websocket connection, it _must destroy the socket_ as well as sending an HTTP status line.
4. When the event listener wants to accept the websocket connection, it calls the `handleUpgrade(...)` method on the websocket server. This is how the HTTP-server and the Websocket server are hooked-up in these examples.
5. Note that the call to `handleUpgrade` provides a callback-parameter. This callback has the job of emitting the 'connection' event on the WebSocketServer instance. This seems to be unneccessary boiler-plate code, but it does have one advantage: you can pass extra parameters into the `emit("connection",...)` call, which will all be passed on into the event-listsner for the 'connection' event. [This example](https://github.com/websockets/ws#client-authentication) uses this to send info about the logged-in client to the code that handles web-socket messages (and other events).

[There is a better example here](./example-express-session-socket), with lots of informative comments in Dutch. Use this example to really understand how this mechanism works.
For example:

**Note**: There is also a function in `ws` documented as `server.shouldHandle(request)`. This seems to be useful for the same purpose, but it is intended for a different task: combining multiple websocket-servers on a single http-server. Use the `httpServer.on('upgrade',...)` approach for application specific decisions about which (or how many) clients you want _this server_ to accept.
