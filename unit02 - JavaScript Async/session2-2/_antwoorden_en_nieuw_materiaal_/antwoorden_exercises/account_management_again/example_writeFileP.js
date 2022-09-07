const pw = require('../../promise-wrappers');

const user = {
    "account": "ashlee_waters",
    "username": "ASH"
};

pw.writeFileP(`${user.account}`, user.username).then(() => {
    console.log('done');
}).catch(err => {
    console.log(err.message);
});