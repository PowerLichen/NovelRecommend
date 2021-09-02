const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

const pool = require('./lib/db');
const passportConfig = require('./lib/passport');

passportConfig(pool);

//라우팅 설정
var userRouter = require('./routes/user')(pool);

app.use('/user', userRouter);

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World' });
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