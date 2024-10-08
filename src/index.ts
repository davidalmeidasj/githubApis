import express from 'express';
import dotenv from 'dotenv';
import githubRoutes from './routes/githubRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', githubRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
