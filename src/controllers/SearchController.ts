import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { Search } from '../@types/index';

const Search = {
    search: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol;

        const { data: foundMatches } = await api.get<Search>('/', {
            params: {
                function: 'SYMBOL_SEARCH',
                keywords: stockName,
            },
        });

        // eslint-disable-next-line prettier/prettier
        const polishedMatches = polish(foundMatches).bestMatches.filter((value) => {
                const hasSAO = value.symbol.includes('.SAO');
                if (hasSAO) value.symbol = value.symbol.replace('.SAO', '');
                return value;
            }
        );

        res.setHeader('X-Total-Count', String(polishedMatches.length));

        return res.json(polishedMatches);
    },
};

export default Search;
