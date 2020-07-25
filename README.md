<br>
<p align="center">
  <img src="https://ik.imagekit.io/vhx2sevqtq/method-draw-image_p2GEAGPyO.svg" width="300" heigth="300">
</p>


<p align="center">
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23F8952D">
  </a>
</p>

___

<h3 align="center">
  <a href="#information_source-about">About</a>&nbsp;|&nbsp;
  <a href="#interrobang-reason">Reason</a>&nbsp;|&nbsp;
  <a href="#seedling-minimum-requirements">Requirements</a>&nbsp;|&nbsp;
  <a href="#rocket-technologies-used">Technologies</a>&nbsp;|&nbsp;
  <a href="#school_satchel-how-to-use">How to Use</a>&nbsp;|&nbsp;
  <a href="#link-how-to-contribute">How to Contribute</a>&nbsp;|&nbsp;
  <a href="#licença">License</a>
</h3>

___


## :information_source: About

An API to search for investment funds, prices, and volume of your preferred stock, anything you want.

## :interrobang: Reason

The first goal for this project was to learn more about typescript, which I have used just one time, the second is because I love the investment world and I accidentally discovered the Alpha Vantage API.


## :seedling: Minimum Requirements

- NodeJS v10
- YARN
- You also need an API_KEY from Alpha Vantage, you can get this [free](https://www.alphavantage.co/)

## :rocket: Technologies Used

The project was developed using the following technologies

- NodeJS
- Typescript
- Express
- Axios
- Celebrate

## :school_satchel: How to Use
First you need an API_KEY to use the Alpha Vantage's API that this repostory rely, you can get your api_key [here](https://www.alphavantage.co/)

After this, do that (I suppose you have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed)

1. Clone this repository
    ```bash
    $ git clone https://github.com/wejesuss/s1cket && cd s1cket
    # You can also download the zip in your repository page
    ```

2. Configure the API_KEY
    1. You need to set your API_KEY on your system environment variables as `ALPHA_VANTAGE_KEY`. You can google this.

3. Install Dependecies and Run
    ```bash
    $ yarn install
    # start the API
    $ yarn run dev
    ```
Your server should be running on `http://localhost:3000/`

4. Routes
There is five routes provided by this API:
    1. `/` - Here you can obtain up to five informations about stocks, funds investments and others. See how it works:

        Params:
        - search: A string that can ocupe more than one values if you separate them by comma (`,`)

            type: `string`;

            max-length: 1026;

            return-type: An array of `objects` with global informations about that stock/funds you passed the symbol

        ```typescript
            [{
                'symbol': string,
                'open': string,
                'high': string,
                'low': string,
                'price': string,
                'volume': string,
                'latestTradingDay': string,
                'previousClose': string,
                'change': string,
                'changePercent': string
            }]
        ```

        Examples: `http://localhost:3000/?search=IBM`;
        `http://localhost:3000/?search=IBM,PYPL`;


    2. `/search` - Forgot the symbol? don't worry, you can search by this. See how it works:

        Params:

        - name: The name of the company or investment fund you want to find

            type: `string`;

            return-type: An array of `objects` with companies/funds with a symbol/name similar to the one you searched for

            ```typescript
            [{
                'symbol': string,
                'name': string,
                'type': string,
                'region': string,
                'marketOpen': string,
                'marketClose': string,
                'timezone': string,
                'currency': string,
                'matchScore': string
            }]
            ```

        Examples: `http://localhost:3000/search/microsoft`; `http://localhost:3000/search/paypal`

    3. `/prices/intraday` - Find the prices of one specific stock/funds using intraday prices. See how it works:

        Params:

        - symbol: The symbol of the company or investment fund you want the prices

            type: `string`;

        - interval: The interval period for each price information

            type: `string`;

            options: `1min` | `5min` | `15min` | `30min` | `60min`. Choose the one you prefer :smile:;

            optional: default(`5min`);

        - outputsize: The output limit of the price information

            type: `string`;

            options: `compact` (100 data points) | `full` (all possible data points). Choose the one you prefer :smile:;

            optional: default(`compact`);

        obs: You can not send these params empty

        return-type: An `object` with `data` and `timeSeries` keys with timestamp (ISO format) and open/high/low/close/volume values

        ```typescript
        {
            'data': {
                'information': string,
                'symbol': string,
                'lastRefreshed': string,
                'interval': string,
                'outputSize': string,
                'timeZone': string
            },
            'timeSeries': {
                //just an example
                '2020-07-23T23:55:00.000Z': {
                    'open': string,
                    'high': string,
                    'low': string,
                    'close': string,
                    'volume': string
                }
            }
        }
        ```

        Examples:
            `http://localhost:3000/prices/intraday/ibm`;
            `http://localhost:3000/prices/intraday/msft`;
            `http://localhost:3000/prices/intraday/msft?interval=15min`;
            `http://localhost:3000/prices/intraday/ibm?outputsize=full`;

    4. `/prices/daily` - Find the prices of one specific stock/funds using daily prices. See how it works:

        Params: Same as `/prices/intraday` but `/prices/daily` does not contain `interval` parameter

        return-type: Same as `prices/intraday` but without `interval` key

        ```typescript
        {
            'data': {
                'information': string,
                'symbol': string,
                'lastRefreshed': string,
                'outputSize': string,
                'timeZone': string
            },
            'timeSeries': //This does not change
        }
        ```

        Examples:
        `http://localhost:3000/prices/intraday/ibm`;
        `http://localhost:3000/prices/intraday/msft`;
        `http://localhost:3000/prices/intraday/ibm?outputsize=full`;

    5. `/prices/weekly` - Find the prices of one specific stock/funds using weekly prices. See how it works:

        Params: Same as `/prices/daily` but `/prices/weekly` does not contain `outputsize` parameter

        return-type: Same as `prices/daily` but without `outputSize` key

        ```typescript
        {
            'data': {
                'information': string,
                'symbol': string,
                'lastRefreshed': string,
                'timeZone': string
            },
            'timeSeries': //This does not change
        }
        ```

        Examples:
        `http://localhost:3000/prices/intraday/ibm`;
        `http://localhost:3000/prices/intraday/msft`;

    obs: Some stocks/funds does not support timeseries (intraday, daily, weekly). In that case your reponse will be something like this

    ```typescript
    {
        "error":"Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/query/documentation/) for TIME_SERIES_INTRADAY."
    }
    ```

## :link: How to Contribute

- Fork this repostory

1. Using github CLI
    ```bash
    # You can also use the second option
    $ gh repo fork wejesuss/s1cket
    ```

2. Using the website
    1. You just need to click the 'Fork' button on the top of [this page](https://github.com/wejesuss/s1cket)

- Clone your fork
    ```bash
    $ git clone https://github.com/your-username/s1cket && cd s1cket
    # You can also download the zip in your repository page
    ```

- Create a branch with your changes
    ```bash
    $ git checkout -b my-awesome-changes
    ```

- Make the commit with your changes
    ```bash
    $ git commit -m 'fix: 42'
    ```

- Push your branch
    ```bash
    # Send the code to your remote branch
    $ git push origin my-awesome-changes
    ```

- Pull request your changes

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file.
