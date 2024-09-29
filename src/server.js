const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const port = 3000;

// Enable CORS to allow requests from different origins
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pantherDB', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Route to show specific location details (now always returning JSON)
app.get('/showLocationB', async (req, res) => {
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
            res.json({
                name: location.name,
                address: location.address,
                imageUrl: location.Image_url // Return JSON for frontend to use
            });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching location details', error: err });
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
