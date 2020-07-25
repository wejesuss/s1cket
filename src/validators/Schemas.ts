import { Joi, Segments } from 'celebrate';

const symbolSchema = {
    [Segments.PARAMS]: Joi.object({
        symbol: Joi.string().required().messages({
            'string.empty': 'Symbol parameter can not be empty',
            'any.required': "It's necessary a symbol as a parameter",
        }),
    }),
};

const searchSchema = {
    [Segments.PARAMS]: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Symbol parameter can not be empty',
            'any.required': "It's necessary a symbol as a parameter",
        }),
    }),
};

const bookmarkSchema = {
    [Segments.QUERY]: Joi.object({
        search: Joi.string().max(1026).required().messages({
            'string.base':
                "Search parameter should be of type 'string'. You can separate values with ','",
            'string.empty': 'Search parameter can not be empty',
            'any.required': 'Please include search parameter',
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
    intradayDailyAndWeeklyQueriesSchema,
};
