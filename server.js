const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = require('./lib/db');

app.use(cors({ origin: 'http://localhost:3000/' }));


app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.post('/api/join', (req, res) => {
    let sql = 'INSERT INTO userdata VALUES (null,?,?,?,now(), 0)';
    let id = req.body.id;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let params = [id, password, nickname];
    pool.query(sql, params,
        (err, results, fields) => {
            console.log('Create account end');
        });
});

app.get('/api/join', (req, res, next) => {
    let sql = 'SELECT id, nickname FROM userdata';
    pool.query(sql,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                console.log('Get account data');
                res.send(rows);
            }
        });
});

app.use(function (req, res, next) {
    res.status(404).send('Sorry cannot find that!');
  });

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Listening on port ${port}`))