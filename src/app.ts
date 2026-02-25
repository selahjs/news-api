import express from 'express';
import articleRoutes from './routes/article.routes.js';
// import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use('/articles', articleRoutes);
// app.use('/auth', authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));