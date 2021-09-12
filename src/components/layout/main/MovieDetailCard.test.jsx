import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieCard } from "components";
import { SimpleMovieDetail } from "types";
import { MovieDetailCard } from "./MovieDetailCard";
import { MovieContext } from "context";

const movieDetail = {
    Title: 'Guardians of the Galaxy',
    Year: '2017',
    Runtime: '136 min',
    Director: 'James Gunn',
    Actors: 'Chris Pratt, Zoe Saldana, Dave Bautista',
    Awards: 'Nominated for 1 Oscar. 15 wins & 58 nominations total',
    imdbId: 'tt3896198',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg',
    Rated: "PG-13",
    Released: "05 May 2017",
    Genre: "Action, Adventure, Comedy",
    Writer: "James Gunn, Dan Abnett, Andy Lanning",
    Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
    Language: "English",
    Country: "United States",
    Ratings: [
        {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
        },
        {
        "Source": "Rotten Tomatoes",
        "Value": "85%"
        },
        {
        "Source": "Metacritic",
        "Value": "67/100"
        }
    ],
    Metascore: "67",
    imdbRating: "7.6",
    imdbVotes: "608,202",
    Type: "movie",
    DVD: "22 Aug 2017",
    BoxOffice: "$389,813,101",
    Production: "Marvel Studios, Walt Disney Pictures",
    Website: "N/A",
    Response: "True"
};
// } as SimpleMovieDetail;

test("MovieDetailCard displays the correct title", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("Guardians of the Galaxy");
    expect(text).toBeInTheDocument();
});

test("MovieDetailCard displays the correct year", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("2017");
    expect(text).toBeInTheDocument();
});

test("MovieDetailCard displays the correct image", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );
    
    screen.getByAltText("Movie's poster");

    // const displayImage = document.querySelector("img") as HTMLImageElement;
    const displayImage = document.querySelector("img");
    expect(displayImage.src).toContain('https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg')
});

test("MovieDetailCard displays the correct runtime", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("136 min");
    expect(text).toBeInTheDocument();
});

test("MovieDetailCard displays the correct director", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("James Gunn");
    expect(text).toBeInTheDocument();
});

test("MovieDetailCard displays the correct actors", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("Chris Pratt, Zoe Saldana, Dave Bautista");
    expect(text).toBeInTheDocument();
});

test("MovieDetailCard displays the correct actors", () => {
    render(
        <MovieContext.Provider movieDetail={movieDetail} loading={false}>
            <MovieDetailCard />
        </MovieContext.Provider>
    );

    const text = screen.getByText("Nominated for 1 Oscar. 15 wins & 58 nominations total");
    expect(text).toBeInTheDocument();
});