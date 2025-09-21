import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { InstagramAutomationService } from './services/instagramAutomation.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many connection attempts, please try again later.'
});
app.use('/api/connect', limiter);

// Initialize Instagram automation service
const instagramService = new InstagramAutomationService();

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('connect-instagram', async (data) => {
    try {
      const { email, username, password, twoFactorCode } = data;
      
      // Validate required fields
      if (!email || !username || !password) {
        socket.emit('connection-error', {
          message: 'Email, username, and password are required'
        });
        return;
      }

      socket.emit('connection-status', { 
        status: 'starting', 
        message: 'Initializing browser automation...' 
      });

      // Start Instagram connection process
      const result = await instagramService.connectAccount({
        email,
        username,
        password,
        twoFactorCode,
        socket
      });

      if (result.success) {
        socket.emit('connection-success', {
          message: 'Instagram account connected successfully!',
          profileData: result.profileData
        });
      } else {
        socket.emit('connection-error', {
          message: result.error || 'Failed to connect Instagram account'
        });
      }

    } catch (error) {
      console.error('Connection error:', error);
      socket.emit('connection-error', {
        message: 'An unexpected error occurred during connection'
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for connections`);
});


