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
    timeSeries: Record<string, Record<PolishedInformations, string> | undefined> | undefined;
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
