import { Router } from 'express';
import { celebrate, errors } from 'celebrate';
import Schemes from './validators/Schemes';

import Bookmarks from './controllers/BookmarksController';
import Search from './controllers/SearchController';
import Prices from './controllers/PricesController';

const routes = Router();

routes.get('/', celebrate(Schemes.searchSchema), Bookmarks.index);

routes.get('/search', celebrate(Schemes.symbolSchema));

routes.get('/search/:symbol', Search.search);

routes.get('/prices/intraday', celebrate(Schemes.symbolSchema));
routes.get('/prices/daily', celebrate(Schemes.symbolSchema));
routes.get('/prices/weekly', celebrate(Schemes.symbolSchema));

routes.get(
    '/prices/intraday/:symbol',
    celebrate(Schemes.intradayAndDailyQueriesSchema),
    Prices.intraday
);

routes.get(
    '/prices/daily/:symbol',
    celebrate(Schemes.intradayAndDailyQueriesSchema),
    Prices.daily
);

routes.get('/prices/weekly/:symbol', Prices.weekly);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
routes.use((error, _req, res, _next) => {
    if (error.joi) {
        return res.status(400).json({ error: error.joi.message });
    }

    return res.status(500).json(error);
});

routes.use(errors());

export default routes;
