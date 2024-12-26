"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /tests/movie.test.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Path to your main app file
describe('GET /movies', () => {
    it('should list all movies', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/movies');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
describe('GET /search?q={query}', () => {
    it('should search movies by title or genre', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/search?q=comedy');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.some((movie) => movie.genre === 'comedy')).toBe(true);
    });
});
describe('POST /movies', () => {
    it('should add a new movie (admin required)', async () => {
        const newMovie = {
            title: 'Inception',
            genre: 'Sci-Fi',
            rating: 8.8,
            streamingLink: 'http://example.com/inception',
        };
        const res = await (0, supertest_1.default)(app_1.default).post('/movies').send(newMovie).set('Authorization', 'Bearer admin_token');
        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Inception');
    });
    it('should return 403 if not admin', async () => {
        const newMovie = {
            title: 'Inception',
            genre: 'Sci-Fi',
            rating: 8.8,
            streamingLink: 'http://example.com/inception',
        };
        const res = await (0, supertest_1.default)(app_1.default).post('/movies').send(newMovie);
        expect(res.status).toBe(403);
    });
});
describe('PUT /movies/:id', () => {
    it('should update an existing movie', async () => {
        const updatedMovie = {
            title: 'Inception Updated',
            genre: 'Sci-Fi',
            rating: 9.0,
            streamingLink: 'http://example.com/inception-updated',
        };
        const res = await (0, supertest_1.default)(app_1.default).put('/movies/123').send(updatedMovie).set('Authorization', 'Bearer admin_token');
        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Inception Updated');
    });
});
describe('DELETE /movies/:id', () => {
    it('should delete a movie', async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete('/movies/123').set('Authorization', 'Bearer admin_token');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Movie deleted');
    });
});
