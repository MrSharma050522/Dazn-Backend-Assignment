import { Request, Response } from "express";
import Movie from "../models/movie.model";

// List all movies
export const listMovies = async (req: Request, res: Response) => {
	try {
		const movies = await Movie.find();
		res.status(200).json(movies);
	} catch (error) {
		console.error("Error -> ", error);
		res.status(500).json(error);
	}
};

// Search movies
export const searchMovies = async (req: Request, res: Response) => {
	try {
		const { q } = req.query;
		const movies = await Movie.find({
			$or: [
				{ title: new RegExp(q as string, "i") },
				{ genre: new RegExp(q as string, "i") },
			],
		});
		res.status(200).json(movies);
	} catch (error) {
		console.error("Error -> ", error);
		res.status(500).json(error);
	}
};

// Add a movie
export const addMovie = async (req: Request, res: Response) => {
	try {
		const movie = new Movie(req.body);
		await movie.save();
		res.status(201).json(movie);
	} catch (error) {
		console.error("Error -> ", error);
		res.status(500).json(error);
	}
};

// Update a movie
export const updateMovie = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const movie = await Movie.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(movie);
	} catch (error) {
		console.error("Error -> ", error);
		res.status(500).json(error);
	}
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Movie.findByIdAndDelete(id);
		res.status(204).send();
	} catch (error) {
		console.error("Error -> ", error);
		res.status(500).json(error);
	}
};
