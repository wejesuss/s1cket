import { Response, Request } from 'express';

import api from '../config/api';
import { polish, splitComma } from '../utils/util';
import {
    GlobalQuote,
    PolishedGlobalQuote,
    FunctionKeys,
} from '../@types/index';

class Bookmarks {
    public async index(req: Request, res: Response): Promise<Response> {
        let search = req.query.search;
        const limitOfRequest = 5;

        search = splitComma(search);

        if (search.length > limitOfRequest)
            return res.json({
                error: 'Please do not send more than 5 requests per minute',
            });

        const matchesPromise = search.map(async (value) => {
            const stockInfo = await api.get<GlobalQuote>('/', {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: value,
                },
            });

            const polished = polish<GlobalQuote, PolishedGlobalQuote>(
                stockInfo.data
            );

            return polished.globalQuote;
        });

        const matches = await Promise.all(matchesPromise);

        return res.json(matches);
    }
}

export default new Bookmarks();
