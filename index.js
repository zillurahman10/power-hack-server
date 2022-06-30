const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 5000

app.use(cors())
app.use(express())

app.get('/', (req, res) => {
    res.send('Power Hack!!!!!!!!!')
})



const uri = "mongodb+srv://power-hack:K5OtkCkRshaosxH0@cluster0.ouvty.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        await client.connect()

        const billingsCollection = client.db("power-hack").collection("billings")

        app.get('/billings', async (req, res) => {
            const query = {}
            const result = billingsCollection.find(query)
            const billings = await result.toArray()
            res.send(billings)
        })

        app.post('/', async (req, res) => {

        })

        app.delete('/billings', async (req, res) => {

        })

    }
    finally {

    }
}

run().catch(console.dir)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// K5OtkCkRshaosxH0
// power-hack