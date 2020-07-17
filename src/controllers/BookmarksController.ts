import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { GlobalQuote, PolishedGlobalQuote } from '../@types/index';

const Bookmarks = {
    index: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol;

        const { data: bookmarksInfo } = await api.get<GlobalQuote>('/', {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: stockName,
            },
        });

        const polishedMatches = polish<GlobalQuote, PolishedGlobalQuote>(
            bookmarksInfo
        );

        return res.json(polishedMatches.globalQuote);
    },
};

export default Bookmarks;
