const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');

const logger = pino();  // Create a Pino logger instance

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();

        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email: req.body.email });

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });
        
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;