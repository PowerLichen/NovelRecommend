const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

app.use(cors({origin:'http://localhost:3000/'}));


app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.post('/api/join', (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,now(), 0)';
    let id = req.body.id;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let params = [id, password, nickname];
    db.query(sql, params,
        (err, results, fields) => {
            console.log('Create account end');
        })
});

app.listen(port, () => console.log(`Listening on port ${port}`))