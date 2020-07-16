import express from 'express';

import routes from './routes';

const app = express();
app.use(routes);

app.use(function (req, res) {
    res.status(404).redirect('/');
});

app.listen(3000);
