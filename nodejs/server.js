const express = require('express');
const app = express();
const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'db'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `CREATE TABLE people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`
connection.query(sql)

app.get('/', async (req, res) => {
  const sqlInsert = `INSERT INTO people (name) VALUES ('Joao - ${new Date().toISOString()}')`
  connection.query(sqlInsert)

  const sqlSELECT = 'SELECT * FROM people'

  let responseString = `<h1>Full Cycle Rocks!</h1> <br/>`;
  let peopleString = '';

  const results = await new Promise((res, rej) => {
    connection.query(sqlSELECT, (err, rows) => {
      if (err) {
        rej(err)
      } else {
        res(rows)
      }
    })
  })

  results.forEach((result) => {
    peopleString += `<p>${result.name}</p>`
  })

  responseString += peopleString

  res.send(responseString);
})

app.listen(3000, () => {
  console.log('Listening for requests on port 3000');
})
