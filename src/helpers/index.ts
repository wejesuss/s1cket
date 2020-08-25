import api from '../config/api';
import { polish } from '../utils/util';
import {
    PolishedIntradaysDailyAndWeekly,
    IntradaysDailyAndWeekly,
    ExchangeRate,
    FunctionKeys,
} from '../@types/index';
import { AxiosResponse } from 'axios';

class Helpers {
    public polish(data: IntradaysDailyAndWeekly) {
        const result = polish<
            IntradaysDailyAndWeekly,
            PolishedIntradaysDailyAndWeekly
        >(data);

        return result;
    }

    public async intraday(
        stockName: string,
        interval: string,
        outputsize: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: FunctionKeys.intraday,
                symbol: stockName,
                interval,
                outputsize,
            },
        });

        return response;
    }

    public async daily(
        stockName: string,
        outputsize: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: FunctionKeys.daily,
                symbol: stockName,
                outputsize,
            },
        });

        return response;
    }

    public async weekly(
        stockName: string
    ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> {
        const response = api.get<IntradaysDailyAndWeekly>('/', {
            params: {
                function: FunctionKeys.weekly,
                symbol: stockName,
            },
        });

        return response;
    }

    public async exchange(
        from_currency: string,
        to_currency: string
    ): Promise<AxiosResponse<ExchangeRate>> {
        const response = api.get<ExchangeRate>('/', {
            params: {
                function: FunctionKeys.exchangeRate,
                from_currency,
                to_currency,
            },
        });

        return response;
    }
}

export default new Helpers();
