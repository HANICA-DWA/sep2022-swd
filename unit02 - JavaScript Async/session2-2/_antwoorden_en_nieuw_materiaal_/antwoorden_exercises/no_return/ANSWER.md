Het antwoord is `undefined`

```javascript
//...
}).then(() => { //thenA
    readFileP('myFile.txt');
}).then(fileContents => { //thenB
    console.log(fileContents);
});
//...
```

Omdat er in de callback van `thenA` geen `return readFileP('myFile.txt')` staat, retourneert deze functie `undefined`. 

Daarom retourneert `thenA` zelf nu een Promise met als resolve-waarde `undefined`. Deze resolve-waarde wordt nu gebruikt als parameter van de callback van `thenB`.

## Unhandled Promise Rejection

Een bijeffect is dat je nu een Unhandled promise rejection op de console kan zien verschijnen. De uitkomst van de Promise die `readFileP` retourneert wordt niet afgehandeld. 

```
DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

## Oplossingen

Vanszelfsprekend:

```javascript
//...
}).then(() => { //thenA
    return readFileP('myFile.txt');
}).then(fileContents => { //thenB
    console.log(fileContents);
});
//...
```

Maar je kunt ook de accolades weghalen:

```javascript
//...
}).then(() => return readFileP('myFile.txt') //thenA
).then(fileContents => { //thenB
    console.log(fileContents);
});
//...
```

En nog korter:

```javascript
//...
}).then(() => return readFileP('myFile.txt') //thenA
).then(console.log);//thenB
//...
```
