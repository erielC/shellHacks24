const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const port = 3000;

// Enable CORS to allow requests from different origins
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/locations', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Cafe and Library schemas and models
const locationSchema = new mongoose.Schema({
    name: String,
    address: String,
    distance_mi: Number,
    travel_time_mins: Number,
    Image_url: String
});

const Cafe = mongoose.model('Cafe', locationSchema, 'cafe');
const Library = mongoose.model('Library', locationSchema, 'libraries');


// Route to handle fetching locations based on type (cafe or library)
app.get('/getLocations', async (req, res) => {
    const locationType = req.query.type;
    let locations = [];

    try {
        if (locationType === 'cafe') {
            locations = await Cafe.find({});
        } else if (locationType === 'library') {
            locations = await Library.find({});
        }
        res.json(locations);
    } catch (err) {
        res.status(500).send('Error fetching locations');
    }
});

// Route to show specific location details
app.get('/showLocation', async (req, res) => {
    const locationId = req.query.locationId;
    const locationType = req.query.type;

    try {
        let location;
        if (locationType === 'cafe') {
            location = await Cafe.findById(locationId);
        } else if (locationType === 'library') {
            location = await Library.findById(locationId);
        }

        if (location) {
            res.send(`
                <h2>${location.name}</h2>
                <p>Address: ${location.address}</p>
                <p>Distance: ${location.distance_mi} miles</p>
                <p>Travel Time: ${location.travel_time_mins} mins</p>
                <img src="${location.Image_url}" alt="${location.name}" width="200"/>
            `);
            const place = {
                locationDistance: location.distance_mi,
                locationTime: location.travel_time_mins,
                image: location.Image_url,
                address: location.address,
                nameOfLocation: locationName
            }
        } else {
            res.status(404).send('Location not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching location details');
    }
});

// Default route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Server is running. Please use the API endpoints.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
