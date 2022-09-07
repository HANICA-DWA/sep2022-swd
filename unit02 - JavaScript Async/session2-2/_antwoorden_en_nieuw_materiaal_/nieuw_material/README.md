# Aync/Await

In het stuk async_awiat.md wordt vrij goed uitgelegd hoe je Promises-code moet vertalen naar Asyn/Await-code. Dit stuk is een stuk toegankelijker voor onze studenten dan het stuk van Haverbecke over dit onderwerp.

Loop in de les het stuk door en laat de code voorbeelden zien.

Deze tekst komt van [https://javascript.info/async-await](https://javascript.info/async-await) en daar kun je alle code ook life runnen. 

Ik heb de tekst echter engiszins aangepast zodat het beter aansluit bij het materiaal dat we al hebben waardoor we de aangepast teskst in zijn geheel als leerstof voor de toets kunnen gebruiken.

## Note
De meeste stukken spreken denk ik voor zich, maar de onderstaande code is compacter dan dat studenten tot nu toe hebben gezien en ik vermoed dat niet iedereen dit precies begrijpt.

```js
    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      .then(response => response.json())
      .then(githubUser => new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
    
        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      }))
      .catch(error => alert(error.message));
```

Promise chains werken doordat `then` altijd een promise retourneert. Maar in de opgave 'No Return' hebben we gezien dat dit alleen de promise is uit de `then`-calalback als je deze ook expliciet retourneert. 

In de code hierboven gaat het echter wel goed, omdat een enkel-regelige arrow functie (zonder  { }) de uitkomst van de exrpessie op die regel automatisch retourneert. 

Vraag studenten per `then` wat de preciese returnwaarde is van die `then` en waarom.

Daarnaast is het eigenlijk front-end code, maar laten we daar even niet moeilijk over doen.
