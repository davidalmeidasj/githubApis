import { mockUsersResponse, mockUserDetailsResponse, mockUserReposResponse } from './mockData';
import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import githubRoutes from '../src/routes/githubRoutes';

dotenv.config();

const app = express();
app.use('/api', githubRoutes);

process.env.GITHUB_TOKEN = 'your_github_token';

jest.mock('../src/services/GitHubService.ts', () => {
    return {
        GitHubService: jest.fn().mockImplementation(() => {
            return {
                getUsers: jest.fn().mockResolvedValue(mockUsersResponse),
                getUserDetails: jest.fn().mockResolvedValue(mockUserDetailsResponse),
                getUserRepos: jest.fn().mockResolvedValue(mockUserReposResponse)
            };
        })
    };
});

describe('GitHub API Endpoints', () => {
    it('GET /api/users should return users', async () => {
        const res = await request(app).get('/api/users?since=0');
        expect(res.status).toBe(200);
        expect(res.body.users).toEqual(mockUsersResponse.users);
        expect(res.body.next).toBe(mockUsersResponse.next);
    });

    it('GET /api/users/:username/details should return user details', async () => {
        const res = await request(app).get('/api/users/mojombo/details');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockUserDetailsResponse);
    });

    it('GET /api/users/:username/repos should return user repositories', async () => {
        const res = await request(app).get('/api/users/mojombo/repos');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockUserReposResponse);
    });
});
