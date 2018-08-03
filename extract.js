// @flow
const fs = require("fs");
const R = require("ramda");
const replaceString = require("replace-string");
const normalizeNewline = require("normalize-newline");

const file = fs.readFileSync("./your_posts.json", "utf8");
let fixedFile = file;

// Facebook extracts wrong unicode or I don't know how to parse it.
const map = {
  "\\u00c4\\u009b": "ě",
  "\\u00c5\\u00af": "ů",
  "\\u00c3\\u00a1": "á",
  "\\u00c5\\u00a1": "š",
  "\\u00c5\\u00be": "ž",
  "\\u00c5\\u0099": "ř",
  "\\u00c3\\u00ad": "í",
  "\\u00c4\\u008d": "č",
  "\\u00c3\\u00bd": "ý",
  "\\u00c3\\u00a9": "é",
  "\\u00c4\\u008f": "ď",
  "\\u00c3\\u00ba": "ú",
  "\\u00c5\\u00a5": "ť",
  "\\u00c4\\u008c": "č",
  "\\u00c3\\u00b3": "ó",
  "\\u00c5\\u0098": "Ř",
  "\\u00c5\\u0088": "ň",
  "\\u00e2\\u0080\\u009c": "“",
  "\\u00e2\\u0080\\u009d": "“",
  "\\u00c3\\u009a": "Ú",
  "\\u00c5\\u0099": "ř",
  "\\u00c3\\u008d": "í",
  "\\u00c5\\u00bd": "Ž",
  "\\u00c5\\u00a0": "Š",
  "\\u00e2\\u0080\\u0099": "'",
  "\\u00e2\\u0080\\u009e": "“",
  "\\u00e2\\u0080\\u0093": "-"
};

Object.keys(map).forEach(mapKey => {
  const mapValue = map[mapKey];
  fixedFile = replaceString(fixedFile, mapKey, mapValue);
});

const posts = R.flatten(
  JSON.parse(fixedFile)
    .status_updates.map(statusUpdate => statusUpdate.data)
    .filter(item => item != null)
).map(item => item.post);

let postsText = posts.join(`

------------------------------------------

`);

postsText = normalizeNewline(postsText).replace(/\n+/g, "\n\n");

fs.writeFileSync(
  "./posts.txt",
  `
I wrote ${posts.length} posts. Omg.
==================================

${postsText}
`
);
