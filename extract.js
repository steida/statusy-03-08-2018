const fs = require("fs");

const posts = JSON.parse(
  fs.readFileSync("./your_posts.json", "utf8")
).status_updates.map(statusUpdate => statusUpdate.data);

// TODO: Fixnout tu cestinu, jak?

fs.writeFileSync("./extracted.json", JSON.stringify(posts, null, 2));

// console.log(posts);
