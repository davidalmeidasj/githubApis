import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

export class GitHubService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
            request: {
                fetch: fetch as unknown as (input: RequestInfo, init?: RequestInit) => Promise<Response>
            }
        });
    }

    async getUsers(since: string) {
        try {
            const sinceNumber = parseInt(since, 10);
            const { data, headers } = await this.octokit.request('GET /users', { since: sinceNumber });
            return { users: data, next: headers.link };
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getUserDetails(username: string) {
        try {
            const { data } = await this.octokit.request('GET /users/{username}', { username });
            return data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }

    async getUserRepos(username: string) {
        try {
            const { data } = await this.octokit.request('GET /users/{username}/repos', { username });
            return data;
        } catch (error) {
            console.error('Error fetching user repositories:', error);
            throw error;
        }
    }
}
