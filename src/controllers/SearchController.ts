import { Response, Request } from 'express';

import api from '../config/api';
import { polish } from '../utils/util';
import { Search as ISearch, FunctionKeys } from '../@types/index';

class Search {
    public async index(req: Request, res: Response): Promise<Response> {
        const companyName = req.params.name;

        const { data: foundMatches } = await api.get<ISearch>('/', {
            params: {
                function: FunctionKeys.symbolSearch,
                keywords: companyName,
            },
        });

        // eslint-disable-next-line prettier/prettier
        const polishedMatches = polish(foundMatches).bestMatches.filter((value) => value);

        res.setHeader('X-Total-Count', String(polishedMatches.length));

        return res.json(polishedMatches);
    }
}

export default new Search();
