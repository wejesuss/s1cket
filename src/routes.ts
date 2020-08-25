import { Router } from 'express';
import { celebrate, errors } from 'celebrate';
import Schemas from './validators/Schemas';

import Bookmarks from './controllers/BookmarksController';
import Search from './controllers/SearchController';
import Prices from './controllers/PricesController';
import Currencies from './controllers/CurrenciesController';

const routes = Router();

routes.get('/', celebrate(Schemas.bookmarkSchema), Bookmarks.index);

routes.get('/search', celebrate(Schemas.searchSchema));

routes.get('/search/:name', Search.index);

routes.get(
    '/currencies/exchange',
    celebrate(Schemas.exchangeSchema),
    Currencies.exchange
);

routes.get('/prices/intraday', celebrate(Schemas.symbolSchema));
routes.get('/prices/daily', celebrate(Schemas.symbolSchema));
routes.get('/prices/weekly', celebrate(Schemas.symbolSchema));

routes.get(
    '/prices/intraday/:symbol',
    celebrate(Schemas.intradayDailyAndWeeklyQueriesSchema),
    Prices.intraday
);

routes.get(
    '/prices/daily/:symbol',
    celebrate(Schemas.intradayDailyAndWeeklyQueriesSchema),
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
