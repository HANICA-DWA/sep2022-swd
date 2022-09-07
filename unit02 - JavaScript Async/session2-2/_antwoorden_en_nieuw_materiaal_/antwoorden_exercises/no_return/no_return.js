const pw = require('./promise-wrappers');

Promise.resolve().then(() => { //thenA
    pw.readFileP('non-existing-file.txt');
}).then(fileContents => { //thenB
    console.log(fileContents);
});