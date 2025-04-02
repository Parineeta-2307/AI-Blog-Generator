import express from 'express';
import { createBlog } from './blogController.js'; // Corrected path

const router = express.Router();
router.post('/generate', createBlog);
export default router;