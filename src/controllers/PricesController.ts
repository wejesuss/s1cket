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
