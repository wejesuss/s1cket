import express from 'express';

import db from '../db.json';

const app = express();

app.get('/', (req, res) => {
    return res.json(db);
});

app.listen(3000);
