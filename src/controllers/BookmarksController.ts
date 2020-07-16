import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { Search } from '../@types/index';

const Bookmarks = {
    index: async (_: Request, res: Response): Promise<Response> => {
        const { data: foundMatches } = await api.get<Search>('/');
        const polishedMatches = polish(foundMatches);

        res.setHeader(
            'X-Total-Count',
            String(polishedMatches.bestMatches.length)
        );

        return res.json(polishedMatches.bestMatches);
    },
};

export default Bookmarks;
