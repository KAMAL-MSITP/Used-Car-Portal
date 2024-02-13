const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const { Car, User } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api', routes);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/carplatform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.post('/insertData',async (req, res) => {
  const data = req.body;
    console.log("inside insertData");
    console.log(data);
    try {
      await client.connect();
      console.log('Connected to the server');
      const db = client.db(dbName);
      const collection = db.collection('usedcardetails');

        // Insert data into the collection
        const result = await collection.insertOne(data);

        // Close the MongoDB connection
        client.close();

        // Send a success response
        res.status(200).send('Data inserted successfully into MongoDB');
    } catch (err) {
        // Log and send an error response
        console.error('Error inserting data into MongoDB:', err);
        res.status(500).send('Error inserting data')
    }
  });

app.get('/seller.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'seller.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'carplatform';
const client = new MongoClient(uri);
const userSchema = new mongoose.Schema({
  Make: String, // String type
  Model: String, // String type
  KilometersDriven: Number, // Change to Number type if storing numeric values
  BuildYear: Number, // Change to Number type if storing numeric values
  Price: Number, // Change to Number type if storing numeric values
  StateOfRegistration: String, // String type
  Description: String // String type
});
const UsedCarDetail = mongoose.model('usedcardetails', userSchema);

app.get('/usedcardetails', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to the server');
    const db = client.db(dbName);
    const collection = db.collection('usedcardeatils');
    const query = { /* your query criteria */ };
    const documents = await collection.find(query).toArray();
    console.log('Retrieved documents:');
    //console.log(documents);

    // Use the Mongoose model to query the database
    const usedCarDetails = await UsedCarDetail.find();
    console.log(usedCarDetails);

    res.json(usedCarDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    await client.close();
    console.log('Closed the connection');
  }
});
app.post('/filterData',async (req, res) => {
  const selectedValues = req.body;
  console.log('Selected values from frontend to backend', selectedValues);
  const query = {};
  console.log("make"+selectedValues.Make);
  
  const convertedValues = {
    ...selectedValues,
    Price: parseInt(selectedValues.Price),
    BuildYear:parseInt(selectedValues.BuildYear),
    KilometersDriven: parseInt(selectedValues.KilometersDriven),
    
};
 
  if (selectedValues.Make) {
      query.Make = convertedValues.Make;
  }
   if (selectedValues.Model) {
      query.Model = convertedValues.Model;
   }
   if (selectedValues.KilometersDriven) {
     query.KilometersDriven = convertedValues.KilometersDriven;
   
   }
   if (selectedValues.BuildYear) {
       query.BuildYear = convertedValues.BuildYear;
   }
   if (selectedValues.Price) {
     query.Price = convertedValues.Price;
   }
  if (selectedValues.StateOfRegistration) {
   query.StateOfRegistration = convertedValues.StateOfRegistration;
}


console.log('Constructed query:', query);
  // Connect to MongoDB and execute the query
  try {
    await client.connect();
    console.log('Connected to the server');
    const db = client.db(dbName);
    const collection = db.collection('usedcardeatils');
   
    //const filteredData = await collection.find(query).toArray();
     // const filteredData = await collection.find(query).toArray();
    //  console.log('Filtered data:',)
     // console.log(filteredData);
     
      const usedCarDetails = await UsedCarDetail.find(query);
      // Send back the filtered data to the frontend
      res.json(usedCarDetails);
      console.log(res);
    } catch (error) {
      console.error('Error occurred while fetching data from MongoDB', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
