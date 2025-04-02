import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import blogRoutes from './blogRoutes.js'; // Corrected path

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (Frontend)
const __dirname = path.resolve();
app.use(express.static(__dirname));

// API Routes
app.use('/api/blogs', blogRoutes);

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
