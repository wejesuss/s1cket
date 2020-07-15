import express from 'express';

import api from './config/api';
import { polish } from './utils/util';
import { Search } from './@types/index';

const app = express();

app.get('/', async (req, res) => {
    const { data: foundMatches } = await api.get<Search>('/');
    const polishedMatches = polish(foundMatches);

    res.setHeader('X-Total-Count', String(polishedMatches.bestMatches.length));

    return res.json(polishedMatches.bestMatches);
});

app.get('/search/:symbol', async (req, res) => {
    const stockName = req.params.symbol.toLowerCase();

    const { data: foundMatches } = await api.get<Search>('/');
    const polishedMatches = polish(foundMatches);

    const stocks = polishedMatches.bestMatches.filter((stock) => {
        const includesSymbol =
            stock['symbol'].toLowerCase() === stockName.toLowerCase();
        const includesName = stock['name']
            .toLowerCase()
            .includes(stockName.toLowerCase());

        if (includesSymbol || includesName) return stock;
    });

    res.setHeader('X-Total-Count', String(stocks.length));

    return res.json(stocks);
});

app.listen(3000);
