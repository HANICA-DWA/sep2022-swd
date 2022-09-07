const fs = require('fs');

let balance = 100;

reduceBalance(80).then(newBalance => {
    console.log(newBalance);
}).catch(err => {
    console.log(err.message);
});

reduceBalance(80).then(newBalance => {
    console.log(newBalance);
}).catch(err => {
    console.log(err.message);
});

function reduceBalance(amount) {
    return checkBalance(amount).then(() => {
        balance -= amount;
        return Promise.resolve(balance);
    });
}


function checkBalance(amount) {
    if (balance >= amount) {
        return Promise.resolve();
    } else {
        return Promise.reject(new Error("not enough"));
    }
}


