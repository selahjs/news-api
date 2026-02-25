import express from 'express';
import dotenv from 'dotenv';
import articleRoutes from './routes/article.routes'; // Removed .js
import authRoutes from './routes/auth.routes';       // Ensure consistent naming

dotenv.config();

const app = express();
app.use(express.json());

app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));