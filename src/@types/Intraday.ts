export interface Intraday {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Interval': string;
    '5. Output Size': string;
    '6. Time Zone': string;
}

export type intradayInformations =
    | '1. open'
    | '2. high'
    | '3. low'
    | '4. close'
    | '5. volume';
