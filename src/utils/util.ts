import { PolishedSearch } from '../@types/index';

const keys = {
    'Meta Data': 'data',
    '1. Information': 'information',
    '2. Symbol': 'symbol',
    '3. Last Refreshed': 'lastRefreshed',
    '4. Interval': 'interval',
    '4. Output Size': 'outputSize',
    '5. Output Size': 'outputSize',
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

    'Time Series (1min)': 'timeSeries1Min',
    'Time Series (5min)': 'timeSeries5Min',
    'Time Series (15min)': 'timeSeries15Min',
    'Time Series (30min)': 'timeSeries30Min',
    'Time Series (60min)': 'timeSeries60Min',
    'Time Series (Daily)': 'timeSeriesDaily',

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
};

const timestamp = /[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2}:[0-9]{2})?/g;

const polish = <T = unknown, R = PolishedSearch>(data: T): R => {
    if (!data || typeof data !== 'object') return (data as unknown) as R;

    const clean = {};

    Object.keys(data).forEach((key) => {
        key = key.toString();

        if (timestamp.test(key)) {
            const timestampWithGMT = key + ' GMT-0400';

            clean[new Date(timestampWithGMT).toISOString()] = polish(data[key]);
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

export { polish };
