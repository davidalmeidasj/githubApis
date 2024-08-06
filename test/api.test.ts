import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
app.get('/api', (req: Request, res: Response) => {
    res.send('Hello from the API!');
});

describe('GET /api', () => {
    it('should return Hello from the API!', async () => {
        const res = await request(app).get('/api');
        expect(res.text).toBe('Hello from the API!');
        expect(res.status).toBe(200);
    });
});
