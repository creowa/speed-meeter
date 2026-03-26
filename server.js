/* 
   BACKEND SERVER (server.js)
   Run this with: node server.js
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows the frontend to talk to this backend
app.use(bodyParser.json());

// In-Memory Database (Simulated)
// In a real app, you would use MongoDB or SQL
let rideHistory = [];

// 1. API Endpoint to Save a Ride
app.post('/api/rides', (req, res) => {
    const { date, distance, maxSpeed, duration } = req.body;

    if (!distance || !maxSpeed) {
        return res.status(400).json({ error: "Missing ride data" });
    }

    const newRide = {
        id: Date.now(),
        date: date || new Date().toISOString(),
        distance: distance,
        maxSpeed: maxSpeed,
        duration: duration
    };

    rideHistory.push(newRide);
    console.log("New Ride Saved:", newRide);
    
    res.status(201).json({ message: "Ride saved successfully", ride: newRide });
});

// 2. API Endpoint to Get Ride History
app.get('/api/rides', (req, res) => {
    res.json(rideHistory);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Xtreme Backend Server running on http://localhost:${PORT}`);
});
