import express from "express";
import {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import { isAdmin } from "../middlewares/auth.middleware";

const router = express.Router();


router.get("/movies", listMovies);
router.get("/search", searchMovies);
router.post("/movies", isAdmin, addMovie); // Add middleware for "admin" role
router.put("/movies/:id", isAdmin, updateMovie); // Add middleware for "admin" role
router.delete("/movies/:id", isAdmin, deleteMovie); // Add middleware for "admin" role

export default router;