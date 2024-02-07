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

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'carplatform';
const client = new MongoClient(uri);
const userSchema = new mongoose.Schema({
  Make: String,
  Model: String,
  KilometersDriven: String,
  BuildYear: String,
  Price: String,
  StateOfRegistration: String,
  Description: String
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