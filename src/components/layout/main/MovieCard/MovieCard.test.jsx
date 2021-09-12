import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieCard } from "components";
import { SimpleMovieDetail } from "types";

const movieDetail = {
    Title: 'Guardians of the Galaxy',
    Year: '2017',
    imdbId: 'tt3896198',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg'
};
// } as SimpleMovieDetail;

test("MovieCard displays the correct title", () => {
    render(<MovieCard movieDetail={movieDetail} />);

    const text = screen.getByText("Guardians of the Galaxy");
    expect(text).toBeInTheDocument();
});

test("MovieCard displays the correct year", () => {
    render(<MovieCard movieDetail={movieDetail} />);

    const text = screen.getByText("2017");
    expect(text).toBeInTheDocument();
});

test("MovieCard displays the correct image", () => {
    render(<MovieCard movieDetail={movieDetail} />);
    
    screen.getByAltText("Movie's poster");

    // const displayImage = document.querySelector("img") as HTMLImageElement;
    const displayImage = document.querySelector("img");
    expect(displayImage.src).toContain('https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg')
});