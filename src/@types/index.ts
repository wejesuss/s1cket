import {
    Intraday15Minutes,
    Intraday1Minutes,
    Intraday30Minutes,
    Intraday5Minutes,
    Intraday60Minutes,
    PolishedIntradayDailyAndWeekly,
    Daily,
    Weekly,
} from './Intraday';
import { SearchResults, PolishedSearchResults } from './Search';

export type IntradaysDailyAndWeekly =
    | Intraday1Minutes
    | Intraday5Minutes
    | Intraday15Minutes
    | Intraday30Minutes
    | Intraday60Minutes
    | Daily
    | Weekly;

export type PolishedIntradaysDailyAndWeekly = PolishedIntradayDailyAndWeekly;

export interface Search {
    bestMatches: SearchResults[];
}

export interface PolishedSearch {
    bestMatches: PolishedSearchResults[];
}

export type GlobalQuoteResults = {
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
};

export interface GlobalQuote {
    'Global Quote': {
        '01. symbol': string;
        '02. open': string;
        '03. high': string;
        '04. low': string;
        '05. price': string;
        '06. volume': string;
        '07. latest trading day': string;
        '08. previous close': string;
        '09. change': string;
        '10. change percent': string;
    };
}

export interface PolishedGlobalQuote {
    globalQuote: GlobalQuoteResults;
}

export enum FunctionKeys {
    globalQuote = 'GLOBAL_QUOTE',
    symbolSearch = 'SYMBOL_SEARCH',
    intraday = 'TIME_SERIES_INTRADAY',
    daily = 'TIME_SERIES_DAILY',
    weekly = 'TIME_SERIES_WEEKLY',
}
