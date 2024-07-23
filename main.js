"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

let operation = "";
let answer;
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress (e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(key) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && key === "-") {
    operation += key;
    input.innerHTML = operation;
    return;
  }

  if (operation.length === 0 && operators.indexOf(key) !== -1) {
    input.innerHTML = operation;
    return;
  }

  if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
    operation = operation.replace(/.$/, key);
    input.innerHTML = operation;
    return;
  }

  if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
    input.innerHTML = operation;
    return;
  }

}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    answer = "";
    result.innerHTML = answer;
    return;
  }

  try {

    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +(eval(final)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      answer = "";
      input.innerHTML = operation;
      result.innerHTML = answer;
      return;
    }

    result.innerHTML = answer;

  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }

}

function clearInput (e) {

  if (e.ctrlKey) {
    operation = "";
    answer = "";
    input.innerHTML = operation;
    result.innerHTML = answer;
    return;
  }

  operation = operation.slice(0, -1);
  input.innerHTML = operation;

}

deleteBtn.addEventListener("click", clearInput);
keys.forEach(key => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});

// Vulnerable XSS example
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const userInput = req.query.input; // Get user input from query parameters
    res.send(`<h1>${userInput}</h1>`); // Reflect the user input in the HTML response
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const crypto = require('crypto');

function generateToken() {
    return Math.random().toString(36).substring(2);
}

console.log(generateToken());

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
