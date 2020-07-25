import { Response, Request } from 'express';

import Helpers from '../helpers';

class Prices {
    public async intraday(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;
        let { interval = '5min' } = req.query;
        let { outputsize = 'compact' } = req.query;

        interval = String(interval);
        outputsize = String(outputsize);

        const isInBrazil = stockName.slice(-4).toUpperCase() === '.SAO';
        if (isInBrazil)
            return res.json({
                error: 'This country does not support this time series',
            });

        const { data: intradayInfo } = await Helpers.intraday(
            stockName,
            interval,
            outputsize
        );

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.polish(intradayInfo);

        return res.json(polishedData);
    }

    public async daily(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;
        let { outputsize = 'compact' } = req.query;

        outputsize = String(outputsize);

        const { data: dailyInfo } = await Helpers.daily(stockName, outputsize);

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.polish(dailyInfo);

        return res.json(polishedData);
    }

    public async weekly(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;

        const { data: dailyInfo } = await Helpers.weekly(stockName);

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.polish(dailyInfo);

        return res.json(polishedData);
    }
}

export default new Prices();
