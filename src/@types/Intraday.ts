interface Intraday {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Interval': string;
    '5. Output Size': string;
    '6. Time Zone': string;
}

interface MetaDaily {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
}

interface MetaWeekly {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Time Zone': string;
}

interface PolishedMetaIntradayDailyAndWeekly {
    information: string;
    symbol: string;
    lastRefreshed: string;
    interval?: string;
    outputSize?: string;
    timeZone: string;
}

type intradayAndDailyInformations =
    | '1. open'
    | '2. high'
    | '3. low'
    | '4. close'
    | '5. volume';

type PolishedInformations = 'open' | 'high' | 'low' | 'close' | 'volume';

export interface Intraday1Minutes {
    'Meta Data': Intraday;
    'Time Series (1min)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}
export interface Intraday5Minutes {
    'Meta Data': Intraday;
    'Time Series (5min)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}
export interface Intraday15Minutes {
    'Meta Data': Intraday;
    'Time Series (15min)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}
export interface Intraday30Minutes {
    'Meta Data': Intraday;
    'Time Series (30min)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}
export interface Intraday60Minutes {
    'Meta Data': Intraday;
    'Time Series (60min)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}

export interface Daily {
    'Meta Data': MetaDaily;
    'Time Series (Daily)': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}

export interface Weekly {
    'Meta Data': MetaWeekly;
    'Weekly Time Series': Record<
        string,
        Record<intradayAndDailyInformations, string>
    >;
}

export interface PolishedIntradayDailyAndWeekly {
    data: PolishedMetaIntradayDailyAndWeekly;
    timeSeries: Record<string, Record<PolishedInformations, string>>;
}
