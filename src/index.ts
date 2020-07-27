import express from 'express';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

app.use(function (req, res) {
    res.status(404).json({ error: 'Try another route' });
});

app.listen(port, () => {
    console.log(`Listening on PORT: ${port}`);
});
