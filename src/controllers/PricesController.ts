import { Response, Request } from 'express';
import api from '../config/api';
import { polish } from '../utils/util';
import {
    PolishedIntradaysDailyAndWeekly,
    IntradaysDailyAndWeekly,
} from '../@types/index';
import { AxiosResponse } from 'axios';

const Helpers = {
    polish: (data: IntradaysDailyAndWeekly) => {
        const result = polish<
            IntradaysDailyAndWeekly,
            PolishedIntradaysDailyAndWeekly
        >(data);

        return result;
    },
    intraday: async (
        stockName: string,
        interval: string,
        outputsize: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> => {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: stockName,
                interval,
                outputsize,
            },
        });

        return response;
    },
    daily: async (
        stockName: string,
        outputsize: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> => {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: stockName,
                outputsize,
            },
        });

        return response;
    },
    weekly: async (
        stockName: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> => {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: 'TIME_SERIES_WEEKLY',
                symbol: stockName,
            },
        });

        return response;
    },
};

const Prices = {
    intraday: async (req: Request, res: Response): Promise<Response> => {
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
    },
    daily: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol;
        let { outputsize = 'compact' } = req.query;

        outputsize = String(outputsize);

        const { data: dailyInfo } = await Helpers.daily(stockName, outputsize);

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.polish(dailyInfo);

        return res.json(polishedData);
    },
    weekly: async (req: Request, res: Response): Promise<Response> => {
        const stockName = req.params.symbol;

        const { data: dailyInfo } = await Helpers.weekly(stockName);

        // eslint-disable-next-line prettier/prettier
        const polishedData = Helpers.polish(dailyInfo);

        return res.json(polishedData);
    },
};

export default Prices;
