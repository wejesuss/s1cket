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

NodeJS v10<br>
YARN<br>
You also need an API_KEY from Alpha Vantage, you can get this [free](https://www.alphavantage.co/)

## :rocket: Technologies Used

The project was developed using the following technologies

- NodeJS
- Typescript
- Express
- Axios
- Celebrate

## :school_satchel: How to Use
First you need an API_KEY to use the Alpha Vantage's API that this repostory rely, you can this [here](https://www.alphavantage.co/)
After this, do that (I suppose you have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed):

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
