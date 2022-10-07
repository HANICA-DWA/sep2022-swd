
const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`

let theSocket;

export function openWebSocket() {
  if(theSocket) {
    theSocket.onerror = null;
    theSocket.onopen  = null;
    theSocket.onclose = null;
    theSocket.close();
  }
  console.log("Opening socket for", `ws://${serverHostname}`);
  theSocket = new WebSocket(`ws://${serverHostname}`);
  return theSocket;
}

export function getWebSocket() {
  if( theSocket ) {
    return theSocket;
  }
  else {
    throw new Error("The websocket has not been opened yet.")
  }
}

function checkFetchError( response ) {
  return response.ok
            ? response.json()
            : Promise.reject(new Error('Unexpected response'));
}

export function startLogin(userName,password) {
  const body = { userName, password };
  const fetchOptions = { method: 'POST',
                         body: JSON.stringify(body),
                         headers: {
                           'Accept': 'application/json',
                           'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                         mode: 'cors'
                       }
  return fetch(serverFetchBase+'/login', fetchOptions)
    .then(response => checkFetchError(response));
}

export function startLogout() {
  return  fetch(serverFetchBase+'/logout', { method: 'DELETE', credentials: 'include', mode: 'cors' })
             .then((response) => checkFetchError(response));
}
