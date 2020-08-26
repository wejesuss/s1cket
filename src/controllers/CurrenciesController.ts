import { Request, Response } from 'express';
import { PolishedExchangeRate, ExchangeRate } from '../@types';

import Helpers from '../Helpers';
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
        const { currency } = req.params;
        const { market } = req.query;

        const polishedCripto = await Helpers.digitalCurrencies.polishedPrices(
            'daily',
            currency,
            String(market)
        );

        return res.json(polishedCripto);
    }

    async weekly(req: Request, res: Response) {
        const { currency } = req.params;
        const { market } = req.query;

        const polishedCripto = await Helpers.digitalCurrencies.polishedPrices(
            'weekly',
            currency,
            String(market)
        );

        return res.json(polishedCripto);
    }

    async monthly(req: Request, res: Response) {
        const { currency } = req.params;
        const { market } = req.query;

        const polishedCripto = await Helpers.digitalCurrencies.polishedPrices(
            'monthly',
            currency,
            String(market)
        );

        return res.json(polishedCripto);
    }
}

export default new Currencies();
