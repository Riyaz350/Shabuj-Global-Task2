const express = require('express')
require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000


app.use(cors({

  origin: ['http://localhost:5173',
    'http://localhost:5174',
    'https://shabuj-global-96e16.web.app'
  ],
  credentials: true

}
))
app.use(express.json({ limit: '200mb' }));


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://SGE:lOuosE1YQpv9LOOO@cluster0.gx7mkcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const users = client.db("SGE").collection("users");
    const uniData = client.db("SGE").collection("uniData");
    const applications = client.db("SGE").collection("applications");


    // HANDMADE MIDDLEWARES



    //   const verifyAdmin = async(req, res, next)=>{
    //     const email = req.decoded.email
    //     const query = {email: email}
    //     const user = await users.findOne(query)
    //     const isAdmin = user?.role === 'admin'
    //     if(!isAdmin){
    //       return res.status(403).send({message: 'forbidden access'})
    //     }
    //     next()
    //   }

    //   USER API

    app.get('/users', async (req, res) => {
      const result = await users.find().toArray()
      res.send(result)
    })

    app.get('/user/:email', async (req, res) => {
      const userEmail = req.params?.email
      const query = { email: userEmail }
      const result = await users.findOne(query)
      res.send(result)
    })

    app.post(`/users`, async (req, res) => {
      const user = req.body
      const query = { email: req.body.email }
      const find = await users.findOne(query)
      if (find) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await users.insertOne(user)
      res.send(result)
    })

    // getting XLSX data

    app.get('/uniData', async (req, res) => {
      const result = await uniData.find().toArray()
      res.send(result)
    })



    app.post('/uniData', async (req, res) => {
      const uniDataArray = req.body;
      // console.log(req?.body)
      const uniDataObject = uniDataArray.map((data) => ({
        'Country': data[0] ?? 'n/a',
        'University Name': data[1] ?? 'n/a',
        'Intake List': data[2] ?? 'n/a',
        'Course Type': data[3] ?? 'n/a',
        'Course Name': data[4] ?? 'n/a',
      }))
      try {
        const result = await uniData.insertMany(uniDataObject);
        res.send({ message: `${result.insertedCount} users inserted successfully`, result });
      } catch (error) {
        res.status(500).send({ message: 'Error inserting users', error });
      }
    })

    // Application data

    app.get('/applications', async (req, res) => {
      const result = await applications.find().toArray()
      res.send(result)
    })

    app.post(`/applications`, async (req, res) => {
      const application = req.body
      const result = await applications.insertOne(application)
      res.send(result)
    })

    app.get('/application/:_id', async (req, res) => {
      const id = req.params._id
      const query = { _id: new ObjectId(id) }
      const result = await applications.findOne(query);
      res.send(result)
    })

    app.patch('/applicationPatch/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $push: {
          comments: req.body,
        }

      };
      const result = await applications.updateOne(query, updateDoc);
      res.send(result);
    })
    app.patch('/applicationPatchDocument/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $push: {
          documents: req.body,
        }
      };
      const result = await applications.updateOne(query, updateDoc);
      res.send(result);
    })


    app.patch('/applicationPatchStatus/:_id', async (req, res) => {
      const id = req.params._id
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          status: req.body
        }
      }
      const result = await applications.updateOne(query, updateDoc)
      res.send(result)
    })


    app.delete('/application/:_id', async (req, res) => {
      const id = req.params._id
      const query = { _id: new ObjectId(id) }
      const result = await applications.deleteOne(query);
      res.send(result)
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('SGE is sitting')
})


app.listen(port, () => {
  console.log(`SGE is sitting on port ${port} `)
})