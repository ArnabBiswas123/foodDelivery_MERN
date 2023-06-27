const express = require('express');

const mymodule = require('./db/connect');

const connectDB = mymodule.connectDB;
// const food_items=mymodule.food_items;

const createuser = require('./Routes/CreateUser')
const DisplayData=require('./Routes/DisplayData')
const OrderData=require('./Routes/OrderData')

require('dotenv').config();
const app = express();
const port =process.env.port|| 5000;

const cors = require('cors')
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Jai Bajrangbali')
})

app.use('/api', createuser);
app.use('/api', DisplayData);
app.use('/api', OrderData);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
        
        // console.log(food_items)
    }
    catch (error) {
        console.log(error)
    }
}
start();