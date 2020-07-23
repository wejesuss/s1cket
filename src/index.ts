import express from 'express';

import routes from './routes';

const app = express();
app.use(routes);

app.use(function (req, res) {
    res.status(404).json({ error: 'Try another route' });
});

app.listen(3000);
