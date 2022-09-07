const pw = require("./promise-wrappers");

pw.readFileP("users.json")
  .then((fileContents) => {
    const users = JSON.parse(fileContents);

    const user_write_promises = users.map((user) => {
      return pw.writeFileP(`_${user.account}.txt`, user.username);
    });

    return Promise.all(user_write_promises);
  })
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err.message);
  });
