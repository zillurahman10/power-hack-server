const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get('/billing-list', async (req, res) => {
            const page = parseFloat(req.query.page + 1)
            const query = {}
            const result = billingsCollection.find(query)
            let billings;
            if (page) {
                billings = await result.skip(page).limit(10).toArray()
            }
            else {
                billings = await result.toArray()
            }
            res.send(billings)
        })

        // app.post('/add-billing', async (req, res) => {
        //     const bill = req.body
        //     const result = await billingsCollection.insertOne(bill)
        //     res.send(result)
        // })

        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await billingsCollection.deleteOne(query)
            res.send(result)
        })

        app.get('/billCount', async (req, res) => {
            const query = {}
            const cursor = billingsCollection.find(query)
            const count = await cursor.count()
            res.send({ count })
        })

        app.get('/billing-list/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = await billingsCollection.findOne(query)
            res.send(cursor)
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