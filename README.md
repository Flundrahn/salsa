# salsa
This project was built as the two week graduation project at [Salt: School of Applied Technology](https://www.salt.dev/)

## Table of Contents
* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)

## About the Project
Salsa is a fullstack application built as a student portal for participants in Salts .NET fullstack training program.

The intended purpose was to make finding the relevant course material at the relevant time, as easy as possible by giving the user three different ways of searching:
- Chronologically using the timeline
- By category, e.g. labs, slides, article
- By key word search

Further, the idea was to also the life easy for the course admins, by enabling them to linking new material through the UI. it is handled by the backend, organized and stored in the database, immediately available on the website.

## Built With

### Back End
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

### Front End
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### Deployment
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

### Auxiliary
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Prerequisites
To get started you will need to have installed
 - .NET 6 or higher
 - Yarn 1.22.19 or higher, or corresponding NPM

## Usage
Start by running the back end. Open a terminal and navigate to `salsa.api` folder, start the API by running

```
dotnet run
```

Open the running localhost port in your browser by using this url `https://localhost:7053/swagger`, you should now be able to interact with Salsa-API using the Swagger interface.

Now move on to running the front end.

Open a new terminal and navigate to the `salsa.ui` folder, start the website with the command

```
yarn install
```
Let Yarn install the dependencies, then run
```
yarn start
```
And open the running localhost port as displayed in the terminal.

## Remarks
The project was originally deployed on Azure using SQL Server, but is now setup with a SQLite database for demo purposes. The finished website can be found at here

[Salsa](https://salmon-coast-0c60d3f03.1.azurestaticapps.net/)

Enjoy!
