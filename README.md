Movie Lobby API for OTT Applications
This is a backend API for managing a movie lobby for OTT applications. The API allows users to list movies, search by title or genre, and add, update, or delete movies from the lobby. It is built using Node.js, TypeScript, MongoDB, and Express.

Table of Contents
1.Prerequisites
2.Setup Instructions
3.API Documentation
4.Test Cases
5.Code Quality and Linting

1.Prerequisites
Before starting, ensure you have the following software installed:
Node.js: Download and install Node.js
MongoDB: Install MongoDB or use MongoDB Atlas (cloud database)
VS Code or any text editor of your choice

Setup Instructions 1. Clone the Repository
If you don’t already have the project, clone it using git:

    git clone https://github.com/MrSharma050522/Dazn-Backend-Assignment
    cd Dazn-Backend-Assignment

    2. Install Dependencies
    Navigate to the project folder and install the required dependencies by running:


    npm install
    This will install the required packages, including Express, Mongoose, and other dependencies.

    3. Set Up MongoDB
    If you’re using MongoDB Atlas, create a cluster and get your connection URI.
    If you’re using local MongoDB, ensure the MongoDB server is running on mongodb://localhost:27017/movielobby.
    In your .env file, set the following environment variable:


    MONGO_URI=mongodb://localhost:27017/movielobby

    4. Run the API
    To run the server locally, use the following command:


    npm run build
    npm start
    This will start the API on http://localhost:3000.

    If you're using nodemon for auto-reloading during development, you can use:


    npm run start

    API Documentation
    1. GET /movies: List all the movies in the lobby
    Request:

    GET http://localhost:3000/movies
    Response:

    json
    [
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "rating": 8.8,
        "streamingLink": "https://example.com/inception"
    },
    {
        "title": "The Dark Knight",
        "genre": "Action",
        "rating": 9.0,
        "streamingLink": "https://example.com/thedarkknight"
    }
    ]

    2. GET /search?q={query}: Search for a movie by title or genre
    Request:

    GET http://localhost:3000/search?q=sci-fi
    Response:

    json
    [
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "rating": 8.8,
        "streamingLink": "https://example.com/inception"
    }
    ]
    3. POST /movies: Add a new movie to the lobby (requires "admin" role)
    Request:

    POST http://localhost:3000/movies

    {
        "title": "Titanic",
        "genre": "Romance",
        "role": "admin",
        "rating": 7.8,
        "streamingLink": "https://example.com/titanic"
    }
    Response:

    {
        "title": "Interstellar",
        "genre": "Sci-Fi",
        "rating": 8.6,
        "streamingLink": "https://example.com/interstellar",
        "_id": "676d35df22edbbd690d62470",
        "__v": 0
    }

    4. PUT /movies/:id: Update an existing movie's information (requires "admin" role)
    Request:

    PUT http://localhost:3000/movies/1

    {
        "title": "Interstellar",
        "genre": "Drama-1",
        "role": "admin",
        "streamingLink": "https://example.com/interstellar",
        "rating": 8
    }
    Response:

    {
        "_id": "676d35df22edbbd690d62470",
        "title": "Interstellar",
        "genre": "Drama-1",
        "rating": 8,
        "streamingLink": "https://example.com/interstellar",
        "__v": 0
    }

    5. DELETE /movies/:id: Delete a movie from the lobby (requires "admin" role)
    Request:

    DELETE http://localhost:3000/movies/1

Test Cases 1. Test Get Movies Endpoint
import request from 'supertest';
import app from './app'; // Adjust based on your file structure

    describe('GET /movies', () => {
    it('should return a list of movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    });
    2. Test Search Movies Endpoint


    describe('GET /search', () => {
    it('should return movies based on search query', async () => {
        const response = await request(app).get('/search?q=Sci-Fi');
        expect(response.status).toBe(200);
        expect(response.body[0].genre).toBe('Sci-Fi');
    });
    });
    3. Test Post Movie Endpoint


    describe('POST /movies', () => {
    it('should add a new movie', async () => {
        const movieData = {
        title: 'Avengers: Endgame',
        genre: 'Action',
        rating: 8.4,
        streamingLink: 'https://example.com/endgame'
        };

        const response = await request(app)
        .post('/movies')
        .set('Authorization', 'Bearer <admin-token>')
        .send(movieData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Movie added successfully');
        expect(response.body.movie.title).toBe(movieData.title);
    });
    });
    4. Test Put Movie Endpoint


    describe('PUT /movies/:id', () => {
    it('should update an existing movie', async () => {
        const updatedData = {
        title: 'Avengers: Endgame - Remastered',
        genre: 'Action',
        rating: 8.7,
        streamingLink: 'https://example.com/endgame-remastered'
        };

        const response = await request(app)
        .put('/movies/1')
        .set('Authorization', 'Bearer <admin-token>')
        .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.movie.title).toBe(updatedData.title);
    });
    });
    5. Test Delete Movie Endpoint


    describe('DELETE /movies/:id', () => {
    it('should delete a movie', async () => {
        const response = await request(app)
        .delete('/movies/1')
        .set('Authorization', 'Bearer <admin-token>');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Movie deleted successfully');
    });
    });
    Code Quality and Linting
    You can use ESLint to ensure code quality and maintainability.

    1. Install ESLint:


    npm install eslint --save-dev
    2. Set Up ESLint:


    npx eslint --init
    3. Run ESLint:


    npx eslint . --fix
    Conclusion
    You now have a complete API to manage a movie lobby. The setup steps include running the server, testing endpoints, and using test cases written in TypeScript with Jest. You can use this API to manage movies with features like adding, updating, searching, and deleting movies, as well as role-based access control for admins.
