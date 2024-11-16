import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env',
});
import express from 'express';
import cors from 'cors';
import { stringify } from 'json-bigint';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/backend/index.js';
import http from 'http';
import { Server } from 'socket.io';

// Express App Setup
const app = express();
const server = http.createServer(app); // Use HTTP server for socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust based on your frontend origin
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DFINITY Agent Setup
const host = 'http://127.0.0.1:4943';
const agent = new HttpAgent({ host });

if (host === 'http://127.0.0.1:4943') {
  agent
    .fetchRootKey()
    .then(() => {
      console.log('Blockchain connected successfully!');
    })
    .catch((err) => {
      console.error(err);
    });
}

export const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.CANISTER_ID_BACKEND,
});
const users = {};
// Socket.io event handling
io.on('connection', (socket) => {
  socket.on('id', (data) => {
    users[data] = socket.id;
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Express API Routes
app.post('/api/login', async (req, res) => {
  try {
    const { userid, password } = req.body;
    const { message, token } = await backend.login(userid, password);
    res.status(Number(message)).json({ message, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/perform-transaction', async (req, res) => {
  try {
    const { from, to, amount, purpose } = req.body;
    const message = await backend.performTransaction(
      String(from),
      String(to),
      BigInt(amount),
      purpose,
      String(new Date()),
      String(Math.floor(Math.random() * 1000000)),
    );
    res.status(Number(message)).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-u', async (req, res) => {
  try {
    const response = await backend.getUser(
      String('193432059'),
      String('193432059'),
    );
    res.send({ res: stringify(response.user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/getuser', async (req, res) => {
  try {
    const { token, accessToken } = req.body;
    const response = await backend.getUser(String(token), String(accessToken));
    const u = response.user;

    if (response.message === '200') {
      return res.status(200).json({
        message: response.message,
        user: stringify(u),
      });
    }

    return res
      .status(404)
      .json({ error: 'Either the userid or access is denied.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-access', async (req, res) => {
  try {
    const { token, accessToken } = req.body;
    const response = await backend.addAccess(
      String(token),
      String(accessToken),
    );

    if (response === '200') {
      return res.status(200).json({ message: 'Successfully added!' });
    }

    return res.status(404).json({ error: response });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
