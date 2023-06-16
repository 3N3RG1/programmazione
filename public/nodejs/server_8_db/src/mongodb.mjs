import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { // con new se crea un oggetto MongoClient
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

// inseriamo in una collezione all'interno del database il documento con i dati del nostro utente
export async function insertUser(user) {
    try {
		await client.connect()
		const database = client.db(process.env.MONGODB_DBNAME) // il nome del database nel quale dobbiamo costruire una collezione
		const usersCollection = database.collection("users") // collezione nel quale inseriamo il documento dello user
		// user is the document to insert in the collection
		const result = await usersCollection.insertOne(user)
		console.log(`A document was inserted with the _id: ${result.insertedId}`)
	} finally {
		await client.close()
    }
}