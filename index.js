const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

const allCars = require('./Data/allCars.json');
const carCategories = require('./Data/CarCategories.json');

app.get('/', (req, res) => {
    res.send('Dream Car server is Running');
});


app.get('/category', (req, res) =>{
    res.send(carCategories);
})

app.get('/allCars', (req, res)=>{
    res.send(allCars);
})

app.get('/category/:id', (req, res)=>{
    const id = req.params.id;
    if(id === '7'){
        res.send(allCars)
    }
    else{
        const selectedCars = allCars.filter(n => n.category_id === id);
        res.send(selectedCars);
    }
})

app.listen(port, () => {
    console.log('Dream Car Server running on port', port);
})