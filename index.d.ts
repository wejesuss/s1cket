// Type definitions for s1cket api 1.0.0
// Project: https://github.com/wejesuss/s1cket
// Definitions by: Wemerson Jesus <https://github.com/wejesuss>

export interface PolishedMetaIntradayDailyAndWeekly {
    information: string;
    symbol: string;
    lastRefreshed: string;
    interval?: string;
    outputSize?: string;
    timeZone: string;
}

export type PolishedInformations = 'open' | 'high' | 'low' | 'close' | 'volume';

export interface PolishedIntradayDailyAndWeekly {
    data: PolishedMetaIntradayDailyAndWeekly | undefined;
    timeSeries:
        | Record<string, Record<PolishedInformations, string> | undefined>
        | undefined;
    error?: string;
}

export interface PolishedSearchResults {
    symbol: string;
    name: string;
    type: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    timezone: string;
    currency: string;
    matchScore: string;
}

export type PolishedSearch = PolishedSearchResults[];

export interface PolishedCriptoMetaData {
    information: string;
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
    lastRefreshed: string;
    timeZone: string;
}

export type PolishedCriptoSeriesData = {
    // something like 'openCNY' and 'highCNY'
    [key: string]: string;
    openUSD: string;
    highUSD: string;
    lowUSD: string;
    closeUSD: string;
    volume: string;
    marketCapUSD: string;
};

export interface PolishedCriptoSeries {
    data: PolishedCriptoMetaData | undefined;
    timeSeries:
        | Record<string, PolishedCriptoSeriesData | undefined>
        | undefined;
    error?: string;
}

export interface PolishedExchangeRate {
    currencyExchangeRate: {
        fromCurrencyCode: string;
        fromCurrencyName: string;
        toCurrencyCode: string;
        toCurrencyName: string;
        exchangeRate: string;
        lastRefreshed: string;
        timeZone: string;
        bidPrice: string;
        askPrice: string;
    };
}

export interface GlobalQuoteResults {
    symbol: string;
    open: string;
    high: string;
    low: string;
    price: string;
    volume: string;
    latestTradingDay: string;
    previousClose: string;
    change: string;
    changePercent: string;
}

export interface PolishedGlobalQuote {
    globalQuote: GlobalQuoteResults;
}
