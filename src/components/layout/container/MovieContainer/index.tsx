import { MovieCard, SearchBar } from "components";
import { MovieContext, MovieProdiver, MovieContextType } from "context";

import React, { useContext, useEffect, useState } from "react";
import { SimpleMovieDetail } from "types";

export const MovieContainer: React.FC = () => {

    const { 
        movieList, 
        movieDetail, 
        searchMovie, 
        extendedSearchMovie, 
        inspectMovie,
        searchRandomMovies
    } = useContext(MovieContext) as MovieContextType;

    const [searchParam, setSearchParam] = useState<string>(null);

    useEffect(() => {
        searchRandomMovies()
    }, [])

    return (
        <>
            <SearchBar setSearchParam={setSearchParam} />
            <div className="flex flex-wrap justify-around">
                {
                    movieList.map((movie: SimpleMovieDetail) => (
                        <MovieCard key={movie.imdbID} movieDetail={movie} inspectMovie={inspectMovie} />
                    ))
                }
            </div>
        </>
    )
}
