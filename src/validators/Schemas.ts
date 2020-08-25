import { Joi, Segments } from 'celebrate';
import currencies from './currencies.json';

const physicalCodes = currencies.physical.map((currency) => currency.code);
const digitalCodes = currencies.digital.map((digital) => String(digital.code));

const currenciesFormatted = physicalCodes.concat(digitalCodes).sort();
const currenciesAsString = currenciesFormatted.join(', ');
const physicalCurrenciesAsString = physicalCodes.sort().join(', ');
const digitalCurrenciesAsString = digitalCodes.sort().join(', ');

const symbolSchema = {
    [Segments.PARAMS]: Joi.object({
        symbol: Joi.string().required().messages({
            'string.empty': 'symbol parameter can not be empty',
            'any.required': "It's necessary a symbol as a parameter",
        }),
    }),
};

const searchSchema = {
    [Segments.PARAMS]: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'symbol parameter can not be empty',
            'any.required': "It's necessary a symbol as a parameter",
        }),
    }),
};

const bookmarkSchema = {
    [Segments.QUERY]: Joi.object({
        search: Joi.string().max(1026).required().messages({
            'string.base':
                "search parameter should be of type 'string'. You can separate values with ','",
            'string.empty': 'search parameter can not be empty',
            'any.required': 'Please include search parameter',
        }),
    }),
};

const exchangeSchema = {
    [Segments.QUERY]: Joi.object({
        from_currency: Joi.string()
            .valid(...currenciesFormatted)
            .insensitive()
            .required()
            .messages({
                'string.base':
                    "from_currency parameter should be of type 'string'.",
                'string.empty': 'from_currency parameter can not be empty',
                'any.required': 'Please include from_currency parameter',
                'any.only': `from_currency must be one of [${currenciesAsString}]`,
            }),
        to_currency: Joi.string()
            .valid(...currenciesFormatted)
            .insensitive()
            .required()
            .messages({
                'string.base':
                    "to_currency parameter should be of type 'string'.",
                'string.empty': 'to_currency parameter can not be empty',
                'any.required': 'Please include to_currency parameter',
                'any.only': `to_currency must be one of [${currenciesAsString}]`,
            }),
    }),
};

const criptoSchema = {
    [Segments.QUERY]: {
        market: Joi.string()
            .default('CNY')
            .valid(...physicalCodes)
            .insensitive()
            .messages({
                'string.base': "market parameter should be of type 'string'.",
                'string.empty': 'market parameter can not be empty',
                'any.only': `market must be one of [${physicalCurrenciesAsString}]`,
            }),
    },
    [Segments.PARAMS]: Joi.object({
        currency: Joi.string()
            .valid(...digitalCodes)
            .insensitive()
            .messages({
                'any.only': `currency must be one of [${digitalCurrenciesAsString}]`,
            }),
    }),
};

const intradayDailyAndWeeklyQueriesSchema = {
    [Segments.QUERY]: {
        interval: Joi.string()
            .default('5min')
            .regex(/^(1|5|15|30|60)min$/)
            .messages({
                'string.base': "interval parameter should be of type 'string'",
                'string.empty': "'interval' is not allowed to be empty",
                'string.pattern.base':
                    "interval parameter is not in the range covered by the api: '1min' | '5min' | '15min' | '30min' | '60min'",
            }),
        outputsize: Joi.string()
            .default('compact')
            .regex(/^(compact|full)$/)
            .messages({
                'string.base':
                    "outputsize parameter should be of type 'string'",
                'string.empty': "'outputsize' is not allowed to be empty",
                'string.pattern.base':
                    "'outputsize' parameter should be 'compact' or 'full'",
            }),
    },
};

export default {
    symbolSchema,
    searchSchema,
    bookmarkSchema,
    exchangeSchema,
    criptoSchema,
    intradayDailyAndWeeklyQueriesSchema,
};
