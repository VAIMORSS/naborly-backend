import express from 'express';
import loadata from './src/data-loader.js';
import Datastore from 'nedb';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4040;
const ITEMS_PER_PAGE = 20;

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));


var db = new Datastore({
    filename: path.join(path.resolve(), "/tmp/database.db")
    , autoload: true
});

app.get('/properties', (req, res) => {
    db.find({}).skip((req.query.page - 1) * (ITEMS_PER_PAGE)).limit(req.query.limit).exec((err, docs) => {
        res.send(docs);
    })
})

app.get('/loadata', async (req, res) => {
    await loadata();
    res.sendStatus(200);
})

app.listen(port, async () => {
    console.log("listening to port : ", port);
});



