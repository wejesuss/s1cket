import { Response, Request } from 'express';

import Helpers from '../Helpers/Helpers';

class Prices {
    public async intraday(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;
        let { interval = '5min' } = req.query;
        let { outputsize = 'compact' } = req.query;

        interval = String(interval);
        outputsize = String(outputsize);

        const { data: intradayInfo } = await Helpers.stocks.intraday(
            stockName,
            interval,
            outputsize
        );

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.stocks.polish(intradayInfo);

        return res.json(polishedData);
    }

    public async daily(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;
        let { outputsize = 'compact' } = req.query;

        outputsize = String(outputsize);

        const { data: dailyInfo } = await Helpers.stocks.daily(
            stockName,
            outputsize
        );

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.stocks.polish(dailyInfo);

        return res.json(polishedData);
    }

    public async weekly(req: Request, res: Response): Promise<Response> {
        const stockName = req.params.symbol;

        const { data: dailyInfo } = await Helpers.stocks.weekly(stockName);

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.stocks.polish(dailyInfo);

        return res.json(polishedData);
    }
}

export default new Prices();
