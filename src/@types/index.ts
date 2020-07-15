import { Intraday, intradayInformations } from './Intraday';

export interface Intraday1Minutes {
    'Meta Data': Intraday;
    'Time Series (1min)'?: Record<string, Record<intradayInformations, string>>;
}
export interface Intraday5Minutes {
    'Meta Data': Intraday;
    'Time Series (5min)'?: Record<string, Record<intradayInformations, string>>;
}
export interface Intraday15Minutes {
    'Meta Data': Intraday;
    'Time Series (15min)'?: Record<
        string,
        Record<intradayInformations, string>
    >;
}
export interface Intraday30Minutes {
    'Meta Data': Intraday;
    'Time Series (30min)'?: Record<
        string,
        Record<intradayInformations, string>
    >;
}
export interface Intraday60Minutes {
    'Meta Data': Intraday;
    'Time Series (60min)'?: Record<
        string,
        Record<intradayInformations, string>
    >;
}
export type Intradays =
    | Intraday1Minutes
    | Intraday5Minutes
    | Intraday15Minutes
    | Intraday30Minutes
    | Intraday60Minutes;

type SearchResults = {
    '1. symbol': string;
    '2. name': string;
    '3. type': string;
    '4. region': string;
    '5. marketOpen': string;
    '6. marketClose': string;
    '7. timezone': string;
    '8. currency': string;
    '9. matchScore': string;
};

export interface Search {
    bestMatches: SearchResults[];
}
