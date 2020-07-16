import { Router } from 'express';
import Bookmarks from './controllers/BookmarksController';
import Search from './controllers/SearchController';

import Validator from './validators/';

const routes = Router();

routes.get('/', Bookmarks.index);

routes.get('/search', Validator.symbolNotFound);

routes.get('/search/:symbol', Search.search);

export default routes;
