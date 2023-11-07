// Step 1: npm init -y 
// Step 2: create script "start" with empty string in package.json.
// Step 3: npm install express 
// Step 4: add script for "dev" with empty string in package.json.
// Step 5: install nodemon in dev dependecies: npm i -D nodemon.
// Step 6: make start script "start" : "node index.js"
// Step 7: make dev script "dev" : "nodemon index.js"

const express = require('express')
const app = express()
const port = 3000 // nodejs port
const path = require('path')
const fs = require('fs')
const fsx = require("fs-extra");


const cars = require("./cars")

app.use(express.static('client'))

app.use(express.json())


// express.json() === bodyParser.json()

app.get('/cars', (req, res) => {
  const data = fsx.readJsonSync("./cars.json");

    res.json([data])
})
  
app.post('/cars',(req, res) =>{
  const brand = req.body.brand
  const data = fsx.readJsonSync("./cars.json");
  data.push(brand)
  fsx.writeJsonSync("./cars.json" ,data)
  const text = "Creating a car...."
  // console.log(text)
  res.status(201).send(text)
})

app.put('/cars', (req, res) => {
  const { oldBrand, newBrand } = req.body;

  // Find the index of the car with the old brand in the array
  const indexToUpdate = cars.findIndex((car) => car.brand === oldBrand);

  if (indexToUpdate !== -1) {
    // If the car is found, update its brand
    cars[indexToUpdate].brand = newBrand;
    console.log(newBrand);
    const text = "Updating a car....";
    res.status(201).send(text);
  } else {
    // If the car is not found, return an appropriate response (e.g., 404 Not Found)
    const text = "Car not found or updated.";
    res.status(404).send(text);
  }
});


app.delete('/cars', (req, res) => {
  const brandToDelete = req.body.brand;
  // Find the index of the car with the specified brand in the array
  const indexToDelete = cars.findIndex(car => car.brand === brandToDelete);
  if (indexToDelete !== -1) {
    // If the car is found, remove it using the splice method
    cars.splice(indexToDelete, 1);
    const text = "Deleting a car....";
    res.status(201).send(text);
  } else {
    // If the car is not found, return an appropriate response (e.g., 404 Not Found)
    const text = "Car not found or deleted.";
    res.status(404).send(text);
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


