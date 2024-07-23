// Vulnerable to XSS
const userInput = '<img src="x" onerror="alert(1)">';
document.getElementById('output').innerHTML = userInput;
// Vulnerable to insecure deserialization
const userInput = '{"isAdmin": true}';
const user = JSON.parse(userInput);
if (user.isAdmin) {
  console.log('User is admin');
}
// Vulnerable to NoSQL Injection
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) throw err;

  const db = client.db('test');
  const userInput = { username: 'admin', password: { $gt: "" } };

  db.collection('users').findOne(userInput, function(err, user) {
    if (err) throw err;
    console.log(user);
  });
});
// Vulnerable to Command Injection
const { exec } = require('child_process');
const userInput = 'test; rm -rf /';

exec(`echo ${userInput}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
// Vulnerable to Sensitive Data Exposure
const password = 'SuperSecretPassword123';
console.log(`User password: ${password}`);
// Vulnerable to SQL Injection
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const userInput = "admin' OR '1'='1";

db.serialize(() => {
  db.run("CREATE TABLE user (username TEXT, password TEXT)");
  db.run(`INSERT INTO user VALUES ('admin', 'password')`);

  db.get(`SELECT * FROM user WHERE username = '${userInput}'`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row);
  });
});
