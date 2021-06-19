import {API_KEY} from "./const/constants"

export const original = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;

export const action = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`;

export const HorrorMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;



export const ComedyMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;

export const RomanceMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;

export const Documentaries = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`;

export const Trending = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

export const Tv = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;