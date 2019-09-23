# NorthCoder's News Front-End Web Application

A web-app inspired by Reddit to display news articles for NorthCoder's News, a fictional online news outlet.

## Table Of Contents

* [Hosted Version](#Hosted-Version)
* [API](#API)
* [Prerequisites](#Prerequisites)
  * [Dependencies & Minimum Versions](#Dependencies-&-Minimum-Versions)
* [Getting Started](#Getting-Started)
  * [Cloning This Repository](#Cloning-This-Repository)
  * [Installing Dependencies](#Installing-Dependencies)
* [Setting Up The API Locally](#Setting-Up-The-API-Locally)
  * [Writing A Local Knex File](#Writing-A-Local-Knex-File)
  * [Seeding A Local Database](#Seeding-A-Local-Database)
* [Testing](#Testing)
  * [Testing Endpoints](#Testing-Endpoints)
  * [Testing the API with Insomnia](#Testing-the-API-with-Insomnia)
* [Endpoints](#Endpoints)
* [Hosting](#Hosting)
* [Authors](#Authors)
* [Acknowledgments](#Acknowledgments)

## Hosted Version

To visit the hosted version please follow [this link.](https://timotillydo-fe-nc-news.netlify.com) 

## API

To see the Back-End for this project please follow [this link.](https://timotillydo-nc-news.herokuapp.com/api)

To see the Github Repo for the API follow [this link.](https://github.com/timotillydo/be-nc-news.git)

## Prerequisties

This project has been built on [Ubuntu](https://ubuntu.com) (18.04.3 LTS) but is not a mandatory operating system.

### Dependencies & Minimum Versions

**Dependencies:**
  * [npm:](https://www.npmjs.com) 6.11.2
  * [@reach/router:](https://reach.tech/router) 1.2.1
  * [axios:](https://www.npmjs.com/package/axios) 0.19.0
  * [lodash.debounce:](https://www.npmjs.com/package/lodash.debounce) 4.0.8
  * [react:](https://reactjs.org) 16.9.0
  * [react-dom:](https://reactjs.org) 16.9.0
  * [react-scripts:](https://reactjs.org) 3.1.1

## Getting Started

### Cloning This Repository

_See 'Deployment' for notes on how to deploy the project on a live system._

Firstly, copy this repo to your local machine: 

 Either: 

* Copy the url from the 'Clone or download' button usually on the right hand side of the screen above this README.

* Then, create (or change to) a directory that you wish the repository to be located.

* Then, in your terminal, use the command:

```js
git clone https://github.com/timotillydo/fe-nc-news.git
```
* Press Enter to download to your local machine.

Or:

2) Download the .zip file to you local machine and extract the contents into a directory of you choosing.

For further information on cloning a repository visit:

* [Github - Cloning A Repository](https://help.github.com/en/articles/cloning-a-repository)

### Installing Dependencies

All dependencies can be installed from the working directory where you have cloned the repository. 

* Running the following command in your terminal will install all dependencies listed within package.json: 

```
npm install
```
_Check [Dependencies](#Dependencies-&-Minimum-Versions) for versions of packages installed_

## Running Locally

To run the appliction locally on your system. Provided all dependencies have been installed. Simply type the following command from the project directory:

```
npm start
```

This runs the app in development mode.<br>
And should open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

## Authors

* **Tim Doran** - [Timotillydo](https://github.com/timotillydo)

See also the list of [contributors](https://github.com/timotillydo/be-nc-news/graphs/contributors) who participated in this project.

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->

## Acknowledgments

Built whilst studying at [Northcoders Manchester](https://northcoders.com).