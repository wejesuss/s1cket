import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { Search } from '../@types/index';

const Search = {
    search: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol.toLowerCase();

        const { data: foundMatches } = await api.get<Search>('/');
        const polishedMatches = polish(foundMatches);

        const stocks = polishedMatches.bestMatches.filter((stock) => {
            const includesSymbol = stock['symbol'].toLowerCase() === stockName;
            const includesName = stock['name']
                .toLowerCase()
                .includes(stockName);

            if (includesSymbol || includesName) return stock;
        });

        res.setHeader('X-Total-Count', String(stocks.length));

        return res.json(stocks);
    },
};

export default Search;
