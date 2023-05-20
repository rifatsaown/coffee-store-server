// import all the required modules
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.meus3dj.mongodb.net/?retryWrites=true&w=majority`;


// use the middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Coffee Server is running ');
});


// ---------------------------------MongoDB Connection---------------------------------//

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally { }
}
run().catch(console.dir);

// ---------------------------------MongoDB Connection---------------------------------//

app.listen(port, () => {
    console.log(`Coffee Server is running on port ${port}`);
});