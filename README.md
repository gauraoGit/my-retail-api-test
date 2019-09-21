# Welcome to myRetailREST service API #

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

## Tech Stack

1. NodeJS with express 
2. Javascript
3. MongoDB - Document DB Data store
4. PostMan - For testing API

## Development envionment setup

1. NodeJS setup
Download and install NodeJS Current LTS version from https://nodejs.org/en/ 
Make sure nodeJs has been installed succesfully by running following command - gives currently installed node version.

```
node -v
```
2. MongoDB

Download MongoDB server to run MongoDB locally https://www.mongodb.com/download-center/community
Before running application, please make sure you have mongo db server running at localhost:27017

database=productsApi
collecitons=products
mongodb host=localhost
mongodb port=27017



3. Install postman for api testing
https://www.getpostman.com/postman

4. Clone Repo locally or download zip

5. Extract and navigate to the directory 

6. Run Below command using powershell or command line from the root of directory where package.json is present

Command downloads all the depedencies for this project
```
npm install
```
Run application
```
npm start
```

5. Now you can access different api endpoints and can test api using postman, you can import postman script from cloned directory


6. Please post some sample data before serving get request

{"id":13860428,"name":"The Big Lebowski (Blu-ray)","current_price":{"value": 14.99,"currency_code":"USD"}}

{"id":15117729,"name":"Product 2- test data","current_price":{"value": 14.99,"currency_code":"USD"}}

{"id":16483589,"name":"Product 3- test data","current_price":{"value": 14.99,"currency_code":"USD"}}

{"id":16696652,"name":"Product 4- test data","current_price":{"value": 14.99,"currency_code":"USD"}}

{"id":16752456,"name":"Product 5- test data","current_price":{"value": 14.99,"currency_code":"USD"}}

{"id":15643793,"name":"Product 6- test data","current_price":{"value": 14.99,"currency_code":"USD"}}

•	Responds to an HTTP GET request at /products/{id} and delivers product data as JSON (where {id} will be a number. 

GET: localhost:3000/api/products/13860428

• Accepts an HTTP PUT request at the same path (/products/{id}), containing a JSON request body similar to the GET response, and updates the product’s price in the data store.

PUT: localhost:3000/api/products/13860428

•	Performs an HTTP GET to retrieve the product name from an external API. (For this exercise the data will come from redsky.target.com, but let’s just pretend this is an internal resource hosted by myRetail) reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response.

GET: localhost:3000/api/ext-products/13860428
