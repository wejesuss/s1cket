import { PolishedSearch } from '../@types/index';
import { physical } from '../validators/currencies.json';

const keys = {
    'Error Message': 'error',

    'Meta Data': 'data',
    '1. Information': 'information',
    '2. Symbol': 'symbol',
    '3. Last Refreshed': 'lastRefreshed',
    '4. Interval': 'interval',
    '4. Output Size': 'outputSize',
    '5. Output Size': 'outputSize',
    '4. Time Zone': 'timeZone',
    '5. Time Zone': 'timeZone',
    '6. Time Zone': 'timeZone',

    '1. symbol': 'symbol',
    '2. name': 'name',
    '3. type': 'type',
    '4. region': 'region',
    '5. marketOpen': 'marketOpen',
    '6. marketClose': 'marketClose',
    '7. timezone': 'timezone',
    '8. currency': 'currency',
    '9. matchScore': 'matchScore',

    'Time Series (1min)': 'timeSeries',
    'Time Series (5min)': 'timeSeries',
    'Time Series (15min)': 'timeSeries',
    'Time Series (30min)': 'timeSeries',
    'Time Series (60min)': 'timeSeries',
    'Time Series (Daily)': 'timeSeries',
    'Weekly Time Series': 'timeSeries',
    'Time Series (Digital Currency Daily)': 'timeSeries',
    'Time Series (Digital Currency Weekly)': 'timeSeries',
    'Time Series (Digital Currency Monthly)': 'timeSeries',

    '1. open': 'open',
    '2. high': 'high',
    '3. low': 'low',
    '4. close': 'close',
    '5. volume': 'volume',

    'Global Quote': 'globalQuote',
    '01. symbol': 'symbol',
    '02. open': 'open',
    '03. high': 'high',
    '04. low': 'low',
    '05. price': 'price',
    '06. volume': 'volume',
    '07. latest trading day': 'latestTradingDay',
    '08. previous close': 'previousClose',
    '09. change': 'change',
    '10. change percent': 'changePercent',

    'Realtime Currency Exchange Rate': 'currencyExchangeRate',
    '1. From_Currency Code': 'fromCurrencyCode',
    '2. From_Currency Name': 'fromCurrencyName',
    '3. To_Currency Code': 'toCurrencyCode',
    '4. To_Currency Name': 'toCurrencyName',
    '5. Exchange Rate': 'exchangeRate',
    '6. Last Refreshed': 'lastRefreshed',
    '7. Time Zone': 'timeZone',
    '8. Bid Price': 'bidPrice',
    '9. Ask Price': 'askPrice',

    '2. Digital Currency Code': 'digitalCurrencyCode',
    '3. Digital Currency Name': 'digitalCurrencyName',
    '4. Market Code': 'marketCode',
    '5. Market Name': 'marketName',
    '6. market cap (USD)': 'marketCapUSD',
};

const timestamp = /[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2}:[0-9]{2})?/g;
const currenciesDataKeys = {
    '1a. open': 'open',
    '1b. open': 'open',
    '2a. high': 'high',
    '2b. high': 'high',
    '3a. low': 'low',
    '3b. low': 'low',
    '4a. close': 'close',
    '4b. close': 'close',
};

const setCurrenciesDataKeys = (): void => {
    const codes = physical.map((currency) => currency.code);
    const keysValues = Object.entries(currenciesDataKeys);

    codes.forEach((code) => {
        keysValues.forEach((keyValue) => {
            const [key, value] = keyValue;
            const dataKey = key + ` (${code})`;
            const dataKeyFormatted = value + `${code}`;

            keys[dataKey] = dataKeyFormatted;
        });
    });
};

const polish = <T = unknown, R = PolishedSearch>(data: T): R => {
    if (!data || typeof data !== 'object') return (data as unknown) as R;

    const clean = {};

    Object.keys(data).forEach((key) => {
        key = key.toString();

        if (timestamp.test(key)) {
            clean[new Date(key).toISOString()] = polish(data[key]);
            return;
        }

        if (key === 'bestMatches') {
            clean[key] = [];
            for (const match of data[key]) {
                clean[key].push(polish(match));
            }
            return;
        }

        clean[keys[key] || key] = polish(data[key]);
    });

    return clean as R;
};

const splitComma = (value: unknown): Array<string> =>
    String(value)
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value);

export { polish, splitComma, setCurrenciesDataKeys };
