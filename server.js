import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path'; 
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import orgRoutes from './routes/orgRoutes.js';
import flagRoutes from './routes/flagRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/organizations', orgRoutes); 
app.use('/api/flags', flagRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running perfectly' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});