import { Router, Request, Response } from 'express';
import { GitHubService } from '../services/GitHubService';

const router = Router();
const githubService = new GitHubService();

router.get('/users', async (req: Request, res: Response) => {
    try {
        const { since } = req.query;
        const result = await githubService.getUsers(since as string);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.get('/users/:username/details', async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const result = await githubService.getUserDetails(username);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user details' });
    }
});

router.get('/users/:username/repos', async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const result = await githubService.getUserRepos(username);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user repositories' });
    }
});

export default router;
