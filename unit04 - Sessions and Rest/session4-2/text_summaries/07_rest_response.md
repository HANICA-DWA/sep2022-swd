<h1>07 REST Response</h1>

  <p>We've looked at requests so far, and understood resource URIs and HTTP methods. Let's switch to responses now.</p>
  <h2 id="from-requests-to-responses">From requests to responses</h2>
  <p>We've learned where to make requests (resource URIs) and how to make requests (HTTP methods). Time to look at responses now. When a request comes in, what should the REST web service respond with? Knowing what the client will get back from the server
    is an important part of the API, because the client needs to write code to handle the response.</p>
  <p>If it were a web application, we know the response is usually an HTML page. With styling, formatting and also, of course, the actual data in a presentable format. But when it comes to RESTful web services, you don't need to do all the styling and formatting
    anymore. You just need to send the actual data. How do you send it?</p>
  <p>We discussed about various standard formats that responses can be sent in, like XML and JSON. JSON has been growing in popularity, because it is much more compact and less verbose when compared to XML, especially when large data is involved. Also, more
    often than not, a client to a RESTful API is client side Javascript code, and sending back data in JSON means it can easily convert it to a Javascript object. Considering these advantages, we'll choose JSON as response for our social media application
    in this course. However, note that you do not typically need to settle for just one format. You can write APIs to support multiple response formats, and we will implement one such API endpoint later in this course to illustrate that.</p>
  <h2 id="formats">Formats</h2>
  <p>Let's say our Message entity class has these four member variables: the id, the text of the message, when it was created and who created it.</p>
  <pre><code class="lang-java">public class MessageEntity {
    private long id;
    private String message;
    private Date created;
    private String author;
...
}
</code></pre>
  <p>When a GET request is made for a specific message, say message ID 10, the JSON that you would return would look something like this:</p>
  <pre><code>{
    "id":"10",
    "message":"Hello world",
    "created":"2014-06-01T18:06:36.902",
    "author":"koushik"
}
</code></pre>
  <p>But the response doesn't <em>have</em> to be JSON. You could return XML as well, if the client asks for it in XML format. We haven't yet covered how a client can <em>ask</em> for a specific format. We'll be looking at that later. But yes, a client can
    say "I need a JSON response" or "Give me an XML response". Here is a possible XML response for the same message ID 10.</p>
  <pre><code>&lt;messageEntity&gt;
    &lt;id&gt;10&lt;/id&gt;
    &lt;message&gt;Hello world&lt;/message&gt;
    &lt;created&gt;2014-06-01T18:06:36.902&lt;/created&gt;
    &lt;author&gt;koushik&lt;/author&gt;
&lt;/messageEntity&gt;
</code></pre>
  <p>Clearly the JSON response and the XML response are different. But they represent the same resource: message ID 10. So, in other words both these responses are different representations of the same resource. This is a very important thing to remember.
    When you make REST API calls you are sending or receiving <em>representations</em> of the resource. Different representations could have different formats, even though the underlying resource is the same. This is actually how REST gets its name. Representational
    State Transfer. You are transferring the representational state.</p>
  <blockquote>
    <p>When you make REST API calls you are sending or receiving <em>representations</em> of the resource.</p>
  </blockquote>
  <h2 id="message-headers">Message Headers</h2>
  <p>Ok, so it's great that a REST web service can return data in XML or JSON. But that brings up a problem. How does the client know what format the response is in? The client can of course request data in a particular format, but there's no guarantee that
    the service responds in that format. Say, a client request asks for XML. But if the REST service knows only JSON, it does return JSON ignoring the client's preference for XML. How does the client know the format then?</p>
  <p>The answer is using HTTP headers. The HTTP protocol has a concept of request and response headers. Every HTTP request or response has a body, which is the message itself, and certain header values that contain metadata about the message. The header
    data could be stuff like the content length and date. One such possible header is <code>Content-Type</code>. The response could contain the Content-Type header with the value for JSON or XML. There are special values for JSON and XML, and we'll learn
    more about that when we implement this, but for now, know that the type of content is being sent back as a response header. The client can then examine this header value and then parse the response body content accordingly.</p>
  <h2 id="status-codes">Status codes</h2>
  <p>Think about error messages in a web application. Whens something goes wrong, the application typically returns a page with an error message, maybe in bold red text. Even if it isn't in red, the message itself would give the user an idea that it's an
    error. But in the case of REST APIs, since the consumer is not a human, we need to provide some set of codes to the consumer to help them identify error scenarios. </p>
  <p>HTTP specification requires the very first line of any response to be a <em>status line</em>. This line will have a numerical code and a short phrase explaining what the code means. This is not just for errors. Every HTTP response needs to have this
    line. If the response is successful, the very first line of the response will be:
    <code>200 OK</code></p>
  <p>Let's take the familiar 404 error code. If a request is made on a URI, for example <code>/messages/101</code> and there is no message available with ID 101, the first line of the response should be:
    <code>404 Not Found</code></p>
  <p>Again, the code <code>404</code> is for the client code to read and act. The phrase <code>Not Found</code> is an aid to the programmer, in case they forget what the code means. Not that any programmer would ever forget what <code>404</code> means. I
    mean, come on!</p>
  <p>There are a bunch of codes that are important for us to remember and use when developing a REST API. The error codes start from 100 and go up to 599. Not all of them are valid error codes though, so you don't have 500 different possible error codes.
    There are 5 classes of status codes and the first digit indicates what class the code belongs to: 1 to 5.</p>
  <h2 id="1xx-codes-informational">1XX Codes - Informational</h2>
  <p>The codes starting with 1XX are informational, like acknowledgement responses. We'll not be using this set of codes in this course.</p>
  <h2 id="2xx-codes-success">2XX Codes - Success</h2>
  <p>The codes starting with 2XX are success codes. This indicates that the server received the request from the client and processed it successfully. Some examples:</p>
  <h3 id="200-ok">200 OK</h3>
  <p>Indicates successful response. You'd return this for any request that you can successfully respond to.</p>
  <h3 id="201-created">201 Created</h3>
  <p>Indicates successful resource creation. Say you get a POST request for a collection URI like <code>/messages</code> and you successfully create a new message. You could return <code>200 OK</code> to indicate success, but a better response code would
    be
    <code>201 Created</code>.</p>
  <h3 id="204-no-content">204 No Content</h3>
  <p>Sometimes the server receives requests that need it to do something, but it doesn't need to return any content back. Like DELETE requests, for example. In this case, you could either return <code>200 OK</code> with no response content. Or return <code>204 No Content</code>,
    which makes it obvious that the server really intends to send nothing back.</p>
  <h2 id="3xx-codes-redirection">3XX Codes - Redirection</h2>
  <p>The server sends these codes to ask the client to do further action to complete the request. For example, it could be a redirect, asking the client to send the request somewhere else. </p>
  <h3 id="302-found-and-307-temporary-redirect">302 Found and 307 Temporary Redirect</h3>
  <p>One of these two error codes are returned by the server if it wants the client to request elsewhere. It's a redirect.</p>
  <h3 id="304-not-modified">304 Not Modified</h3>
  <p>When a client tries to get a resource that it has already got before, the server can send this status code to say "I've already given you this resource a little while back, and nothing has changed since then."</p>
  <h2 id="4xx-codes-client-error">4XX Codes - Client error</h2>
  <p>These error codes are returned if the client makes an error in the request. The request syntax could have been incorrect, or the client is requesting something that it's not supposed to see.</p>
  <h3 id="400-bad-request">400 Bad Request</h3>
  <p>This is a client error. The server is not able to understand the request</p>
  <h3 id="401-unauthorized">401 Unauthorized</h3>
  <p>The request needs the client to <em>sign in</em> or authorize themselves.</p>
  <h3 id="403-forbidden">403 Forbidden</h3>
  <p>The client may have authorized, but they are still not allowed to make the request. (Maybe they don't have the right access rights).</p>
  <h3 id="404-not-found">404 Not Found</h3>
  <p>No description required. :)</p>
  <h3 id="415-unsupported-media-type">415 Unsupported Media Type</h3>
  <p>The client is speaking in a language that the server cannot understand</p>
  <h2 id="5xx-codes-server-error">5XX Codes - Server error</h2>
  <p>The 4XX codes are when the client screws up when sending the request. The 5XX codes are when the server screws up when sending the response. It's basically the server saying, Ok, I got your request, and it looked like a valid one, but something went
    wrong when I tried to process it.</p>
  <h3 id="500-internal-server-error">500 Internal Server Error</h3>
  <p>This is a generic error code. The server gets a request. The resource exists (or you'd send a 404 instead) but something went wrong when processing the request. In such cases, the standard practice is to send the error code 500, along with error details
    in the body of the request.</p>
  <p>There are a bunch of other codes, but these are the important ones to remember. We'll look at more when we start implementing some of these APIs. But let me remind you again. These error codes are for you, as a web service developer to use. The clients
    know what it means when they see one of these error codes. So, it's up to you to send the right error codes when these events happen. For example, let's say you get a runtime exception when processing a request. You need to send back error code 500.
    Because it means server error. And the client will then know what's happened.</p>
  <h2 id="scenarios">Scenarios</h2>
  <p>Let's look at the same CRUD use cases we saw in the previous tutorial, and identify what the status codes should be for the message resource</p>
  <table>
    <thead>
      <tr>
        <th>Operation</th>
        <th style="text-align:center">URI</th>
        <th>Method</th>
        <th>Success / Failure</th>
        <th>Status code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Get message</td>
        <td style="text-align:center"><code>/messages/{messageId}</code></td>
        <td>GET</td>
        <td>Success</td>
        <td>200</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Not found</td>
        <td>404</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Failure</td>
        <td>500</td>
      </tr>
      <tr>
        <td>Delete message</td>
        <td style="text-align:center"><code>/messages/{messageId}</code></td>
        <td>DELETE</td>
        <td>Success</td>
        <td>200 or 204 </td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Not found</td>
        <td>404</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Failure</td>
        <td>500</td>
      </tr>
      <tr>
        <td>Edit message</td>
        <td style="text-align:center"><code>/messages/{messageId}</code></td>
        <td>PUT</td>
        <td>Success</td>
        <td>200 </td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Wrong format / data</td>
        <td>400 or 415</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Not found</td>
        <td>404</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Failure</td>
        <td>500</td>
      </tr>
      <tr>
        <td>Create message</td>
        <td style="text-align:center"><code>/messages</code></td>
        <td>POST</td>
        <td>Success</td>
        <td>201 </td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Wrong format / data</td>
        <td>400 or 415</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:center"></td>
        <td></td>
        <td>Failure</td>
        <td>500</td>
      </tr>
    </tbody>
  </table>
  <p>Hope this gives you a better idea of the status codes to be returned. Responses for other resources would mostly follow the same pattern. Again, this is just a small subset of the HTTP status codes, and we'll look at more when we start implementing
    APIs.</p>
  <p>In this tutorial, we learnt about:</p>
  <ol>
    <li>Resource representations</li>
    <li>Message headers in HTTP and</li>
    <li>HTTP status codes</li>
  </ol>
