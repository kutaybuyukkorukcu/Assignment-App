import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieCard } from "components";
import { SimpleMovieDetail } from "types";

const movieList = [
    {
        Title: 'Guardians of the Galaxy',
        Year: '2017',
        imdbId: 'tt3896198',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg'
    },

];