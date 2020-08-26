import api from '../config/api';
import { polish, setCurrenciesDataKeys } from '../utils/util';
import {
    PolishedIntradaysDailyAndWeekly,
    IntradaysDailyAndWeekly,
    ExchangeRate,
    FunctionKeys,
    CriptoDailyWeeklyAndMonthly,
    PolishedCriptoSeries,
} from '../@types/index';
import { AxiosResponse } from 'axios';

class Helpers {
    public stocks = {
        polish(data: IntradaysDailyAndWeekly) {
            const result = polish<
                IntradaysDailyAndWeekly,
                PolishedIntradaysDailyAndWeekly
            >(data);

            return result;
        },
        async intraday(
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
        },
        async daily(
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
        },
        async weekly(
            stockName: string
        ): Promise<AxiosResponse<IntradaysDailyAndWeekly>> {
            const response = api.get<IntradaysDailyAndWeekly>('/', {
                params: {
                    function: FunctionKeys.weekly,
                    symbol: stockName,
                },
            });

            return response;
        },
    };

    public digitalCurrencies = {
        polish(data: CriptoDailyWeeklyAndMonthly) {
            setCurrenciesDataKeys();

            const results = polish<
                CriptoDailyWeeklyAndMonthly,
                PolishedCriptoSeries
            >(data);

            return results;
        },
        async prices(
            series: 'daily' | 'weekly' | 'monthly',
            currency: string,
            market: string
        ): Promise<AxiosResponse<CriptoDailyWeeklyAndMonthly>> {
            const functions = {
                daily: FunctionKeys.criptoDaily,
                weekly: FunctionKeys.criptoWeekly,
                monthly: FunctionKeys.criptoMonthly,
            };

            const response = api.get<CriptoDailyWeeklyAndMonthly>('/', {
                params: {
                    function: functions[series],
                    symbol: currency,
                    market,
                },
            });

            return response;
        },
        async polishedPrices(
            series: 'daily' | 'weekly' | 'monthly',
            currency: string,
            market: string
        ): Promise<PolishedCriptoSeries> {
            const { data } = await this.prices(series, currency, market);

            const polishedCripto = this.polish(data);

            return polishedCripto;
        },
    };

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
