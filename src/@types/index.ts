import { Intraday, intradayInformations } from './Intraday';
import { SearchResults, PolishedSearchResults } from './Search';

export interface Intraday1Minutes {
    'Meta Data': Intraday;
    'Time Series (1min)': Record<string, Record<intradayInformations, string>>;
}
export interface Intraday5Minutes {
    'Meta Data': Intraday;
    'Time Series (5min)': Record<string, Record<intradayInformations, string>>;
}
export interface Intraday15Minutes {
    'Meta Data': Intraday;
    'Time Series (15min)': Record<string, Record<intradayInformations, string>>;
}
export interface Intraday30Minutes {
    'Meta Data': Intraday;
    'Time Series (30min)': Record<string, Record<intradayInformations, string>>;
}
export interface Intraday60Minutes {
    'Meta Data': Intraday;
    'Time Series (60min)': Record<string, Record<intradayInformations, string>>;
}
export type Intradays =
    | Intraday1Minutes
    | Intraday5Minutes
    | Intraday15Minutes
    | Intraday30Minutes
    | Intraday60Minutes;

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
