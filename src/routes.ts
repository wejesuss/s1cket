import { Router } from 'express';
import Bookmarks from './controllers/BookmarksController';
import Search from './controllers/SearchController';

import Validator from './validators/';
import Prices from './controllers/PricesController';

const routes = Router();

routes.get('/', Bookmarks.index);

routes.get('/search', Validator.symbolNotFound);

routes.get('/search/:symbol', Search.search);

routes.get('/prices', Validator.symbolNotFound);

routes.get('/prices/:symbol', Prices.index);

export default routes;
