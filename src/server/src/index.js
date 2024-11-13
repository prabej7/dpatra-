import dotenv from 'dotenv';
dotenv.config({
    path: "../../.env"
})
import express from "express";
import cors from "cors";

import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/backend/index.js';
// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const host = 'http://127.0.0.1:4943'; // Local development host
const agent = new HttpAgent({ host });

if (host === 'http://127.0.0.1:4943') {
    agent
        .fetchRootKey()
        .then((data) => { })
        .catch((err) => {
            console.log(err);
        });
}

export const backend = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_BACKEND,
});

// Routes
app.get("/", async (req, res) => {
    const response = await backend.getAllUser();

    res.status(200).json({ data: response })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
