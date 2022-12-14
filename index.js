const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json())

// const allCars = require('./Data/allCars.json');
// const carCategories = require('./Data/CarCategories.json');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqmis3n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

        const allCarsData = client.db('SellAnyCarServer').collection('AllCars');
        const selectedCarsData = client.db('SellAnyCarServer').collection('categoryNames');
        const bookingCarData = client.db('SellAnyCarServer').collection('bookingCar');
        
        
        // getting allCars data from the database
        app.get('/allCars', async(req, res)=>{
            const query = {};
            const cursor = allCarsData.find(query);
            const allCars = await cursor.toArray();
            res.send(allCars);
        })

        

        //getting the booking form data and sending to the database
        app.post('/bookingCar', async (req, res) => {
            const booker = req.body; //getting the data from the client
            console.log(booker)
            const result = await bookingCarData.insertOne(booker); //sending data to the server
            res.send(result);            
        })
        
        // getting selectedCars category data from the database
        app.get('/categories', async(req, res)=>{
            const query = {};
            const cursor = selectedCarsData.find(query);
            const selectedCategoryCarsData = await cursor.toArray();
            res.send(selectedCategoryCarsData);
        })

        // getting selected category cars data
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            if(id === '7'){
                const query = { };
                const cursor = allCarsData.find(query);
                const selectedCategoryCarsData = await cursor.toArray();
                res.send(selectedCategoryCarsData);
            }
            else{
                const query = { category_id: id };
                const cursor = allCarsData.find(query);
                const selectedCategoryCarsData = await cursor.toArray();
                res.send(selectedCategoryCarsData);
                
            }
            
        })

    }
    finally{}
}


run().catch(err=>{
    console.log(err);
})




app.get('/', (req, res) => {
    res.send('Dream Car server is Running');
});




app.listen(port, () => {
    console.log('Dream Car Server running on port', port);
})