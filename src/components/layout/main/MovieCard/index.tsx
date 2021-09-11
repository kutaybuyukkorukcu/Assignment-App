import React from "react";
import { MovieDetail, SimpleMovieDetail } from "types";

interface Props {
    movieDetail: SimpleMovieDetail,
    inspectMovie: (movieImdbId: string) => MovieDetail;
}

export const MovieCard: React.FC<Props> = ({ movieDetail, inspectMovie }) => {
    return (
        <div className="w-64 bg-gray-300 p-3 rounded-md mt-4" onClick={() => inspectMovie(movieDetail.imdbID)} key={movieDetail.imdbID}>
            <img src={movieDetail.Poster} className="movie-poster" alt="Movie's poster" />
            <h3 className="text-xl font-extrabold"> { movieDetail.Title } </h3>
            <h5 className="text-lg font-normal"> { movieDetail.Year } </h5>
        </div>
    )
}