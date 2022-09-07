# timout chain

Deze opgave is bedoeld om te laten zien dat promises niet automatisch de hele code synchroon maken.

Het enige dat gegarandeerd is, is de volgorde binnen een promise chain. 

## stappenplan
1. **01_timeout_chain.js**. Bespreek de antwoorden van studenten en check of iedereen het begrepen heeft.
1. **02_resolve_chain.js**. Zelfs als een Promise direct resolved (dus als er geen asynchrone code wordt uitgevoerd), dan wordt de callback van `then` eerst op de event queue gezet. Dat illustreert deze code. Vraag van te voren aan de klas wat de uitvoer is.
1. **03_shared_data.js**. Deze opgave is bedoeld om te laten zien dat het dus ook mis kan gaan als je te maken hebt met shared data. De bedoeling van deze opgave is dat je `balance` niet onder de 0 kan komen. Doordat we de check op `balance` in een functie hebben die een promise retourneert kan het mis gaan. In werkelijkheid kunnen deze situaties best vaak voorkomen, omdat het lezen van en het schrijven naar data die niet in het geheugen staat een asynchrone actie is. 