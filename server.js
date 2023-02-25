
const express = require('express')
//install mongoose
const mongoose = require('mongoose');
require('dotenv').config()

//Import model
const Item = require('./models/item');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//serve public folder
app.use(express.static('public'))
//create collection string
//console.log(process.env.MONGOUSERNAME,process.env.MONGOPASSWORD)
console.log(Item)

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.srxdrsr.mongodb.net/Inventory?retryWrites=true&w=majority`

//connect to cluster
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//let us know mongoose was successful 
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

//Create inventory route, use information from req.body to create new product in collection
app.post('/create_inventory', async (req, res) => {
    const {priceNumber: price, invNumber: inventory, delivDateString: nextDelivery, delivAmtNumber: deliveryAmt, nameString: name} = req.body

    // console.log("uploading to database")

    let newItem = await Item.create({
        price,
        inventory,
        nextDelivery,
        deliveryAmt,
        name
    })
    console.log(newItem);
    if (newItem) {
        console.log('upload complete');
    }
    res.send(newItem)
})

//Display all products from the collections in our database
app.get('/get_inventory_data', async (req, res) => {
    // get data from database using find method
    let response = await Item.find({});
    console.log(response);
    // send it back to front end
    res.json(response)
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})