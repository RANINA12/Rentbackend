const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");

// Import ALL route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes'); 
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://rentmaintain3.vercel.app/",
        methods: ["GET", "POST"],
    },
});

let activeUsers = {};

io.on('connection', (socket) => {
    console.log(`🔌 A user connected: ${socket.id}`);
    socket.on('addUser', (userId) => {
        activeUsers[userId] = socket.id;
        io.emit('getUsers', Object.keys(activeUsers));
        console.log("Active Users:", activeUsers);
    });
    socket.on('disconnect', () => {
        activeUsers = Object.fromEntries(
            Object.entries(activeUsers).filter(([, socketId]) => socketId !== socket.id)
        );
        io.emit('getUsers', Object.keys(activeUsers));
        console.log(`👋 User disconnected. Remaining active users:`, activeUsers);
    });
});

// --- THIS IS THE FIX ---
// Middleware to parse JSON and handle CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://rentmaintain3.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- END OF FIX ---

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// This middleware attaches the io instance and helper function to every request object.
app.use((req, res, next) => {
    req.io = io;
    req.getActiveUserSocketId = (userId) => activeUsers[userId];
    next();
});

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('RentSmart API is running...');
});

// Mount ALL routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes); 

// --- Error Handling Middlewares ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0" , () => {
    console.log(`🚀 Server with Socket.IO running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
