const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentRouter = require('./routes/appointments');
require('dotenv').config();
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: false // ⛔️ menonaktifkan CSP
}));


app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentRouter);

const port = process.env.PORT || 5000;
let uri = '';
process.env.NODE_ENV === 'test' ? uri = process.env.ATLAS_URI_TEST : uri = process.env.ATLAS_URI;

// Fungsi koneksi database
async function connectDB() {
    try {
        await mongoose.connect(uri);

        console.log("Connection to database successful!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Stop the app if DB failed to connect
    }
}

function getCurrentTime() {
    const date = new Date();
    console.log(date);
}

function getEndDateTime(dateTime) {
    const hrs = (parseInt(dateTime.split('T')[1].split(':')[0]) + 1).toString().padStart(2, '0');
    const time = hrs + ':00:00';
    const date = dateTime.split('T')[0];
    return date + 'T' + time;
}

// Start app setelah DB terkoneksi
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
        getCurrentTime();
        console.log(getEndDateTime("2021-03-22T09:00:00"));
    });
});

app.get('/', (req, res) => {
    res.status(200).json("Hello");
});

module.exports = app;
