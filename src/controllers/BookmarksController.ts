import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { GlobalQuote, PolishedGlobalQuote } from '../@types/index';

const Bookmarks = {
    index: async (req: Request, res: Response): Promise<Response> => {
        let search = req.query.search;

        if (!search)
            return res.json({
                error: 'Please include search parameter',
            });

        search = String(search)
            .split(',')
            .map((value) => value.trim());

        if (search.length > 5)
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
    },
};

export default Bookmarks;
