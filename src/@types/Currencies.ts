export interface CriptoMetaData {
    '1. Information': string;
    '2. Digital Currency Code': string;
    '3. Digital Currency Name': string;
    '4. Market Code': string;
    '5. Market Name': string;
    '6. Last Refreshed': string;
    '7. Time Zone': string;
}

export interface PolishedCriptoMetaData {
    information: string;
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
    lastRefreshed: string;
    timeZone: string;
}

export interface TimeSeriesData {
    [key: string]: string;
    '1b. open (USD)': string;
    '2b. high (USD)': string;
    '3b. low (USD)': string;
    '4b. close (USD)': string;
    '5. volume': string;
    '6. market cap (USD)': string;
}

export type PolishedTimeSeriesData = {
    [key: string]: string;
    openUSD: string;
    highUSD: string;
    lowUSD: string;
    closeUSD: string;
    volume: string;
    marketCapUSD: string;
};

export interface CriptoSeriesDaily {
    'Meta Data': CriptoMetaData;
    'Time Series (Digital Currency Daily)':
        | Record<string, TimeSeriesData | undefined>
        | undefined;
}

export interface CriptoSeriesWeekly {
    'Meta Data': CriptoMetaData;
    'Time Series (Digital Currency Weekly)':
        | Record<string, TimeSeriesData | undefined>
        | undefined;
}

export interface CriptoSeriesMonthly {
    'Meta Data': CriptoMetaData;
    'Time Series (Digital Currency Monthly)':
        | Record<string, TimeSeriesData | undefined>
        | undefined;
}
