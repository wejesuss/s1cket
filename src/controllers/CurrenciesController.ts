import { Request, Response } from 'express';
import { PolishedExchangeRate, ExchangeRate } from '../@types';

import Helpers from '../helpers';
import { polish } from '../utils/util';

class Currencies {
    async exchange(req: Request, res: Response) {
        const { from_currency, to_currency } = req.query;
        const { data } = await Helpers.exchange(
            String(from_currency),
            String(to_currency)
        );

        const polishedExchangeRate = polish<ExchangeRate, PolishedExchangeRate>(
            data
        );

        return res.json(polishedExchangeRate);
    }

    async daily(req: Request, res: Response) {
        return res.json('hello');
    }

    async weekly(req: Request, res: Response) {
        return res.json('hello');
    }

    async monthly(req: Request, res: Response) {
        return res.json('hello');
    }
}

export default new Currencies();
