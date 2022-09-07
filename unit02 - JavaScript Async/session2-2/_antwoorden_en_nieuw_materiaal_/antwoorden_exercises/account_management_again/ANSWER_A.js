const pw = require("./promise-wrappers");

users = [
  {
    account: "ashlee_waters",
    username: "ASH",
  },
  {
    account: "hilario_muller",
    username: "Hilario_Muller29",
  },
  {
    account: "serena_klein",
    username: "Serena.Klein",
  },
];

let user_write_promises = [];
users.forEach((user) => {
  user_write_promises.push(
    pw.writeFileP(`_${user.account}.txt`, user.username)
  );
});

Promise.all(user_write_promises).then(() => {
  console.log("done writing accounts");
});

// ==============

// const user_write_promises = users.map((user) => {
//   return pw.writeFileP(`_${user.account}.txt`, user.username);
// });

// Promise.all(user_write_promises).then(() => {
//   console.log("done writing accounts");
// });

// ==============

// Promise.all(
//   users.map(({ account, username }) =>
//     pw.writeFileP(`_${account}.txt`, username)
//   )
// ).then(() => {
//   console.log("done writing accounts");
// });

// ==============
