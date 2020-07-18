import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import { Intradays } from '../@types/index';
import { AxiosResponse } from 'axios';

const Prices = {
    index: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol;
        let { interval = '5min' } = req.query;
        interval = String(interval).slice(0, 4);
        let { outputsize = 'compact' } = req.query;
        outputsize = String(outputsize);

        const times = ['1min', '5min', '15min', '30min', '60min'];
        if (!times.includes(interval)) {
            return res.json({
                error: 'interval param is not in the range covered by the api',
            });
        }

        if (outputsize !== 'compact' && outputsize !== 'full') {
            return res.json({
                error: 'outputsize param should be "compact" or "full"',
            });
        }

        const isNotInBrazil = stockName.slice(-3) !== 'SAO';
        if (interval && outputsize && isNotInBrazil) {
            const { data: intradayInfo } = await Prices.intraday(
                stockName,
                interval,
                outputsize
            );

            // eslint-disable-next-line prettier/prettier
            const polishedData = Prices.polishIntraday(intradayInfo);

            return res.json(polishedData);
        }

        return res.json({ outputsize });
    },
    polishIntraday: (data: Intradays): Intradays => {
        const result = polish<Intradays, Intradays>(data);

        return result;
    },
    intraday: async (
        stockName: string,
        interval: string,
        outputsize: string
    ): Promise<AxiosResponse<Intradays>> => {
        const response = api.get<Intradays>('/', {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: stockName,
                interval,
                outputsize,
            },
        });

        return response;
    },
};

export default Prices;
