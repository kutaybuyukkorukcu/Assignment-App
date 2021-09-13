import React, { useContext, useEffect, useReducer, useState } from "react";
import { MovieDetail, SimpleMovieDetail, SearchType } from "types";
import { MovieCard } from "components";
import { MovieContext, MovieContextType } from "context";

interface Props {
    increasePageNumber: (paginationNumber?: number) => void;
    paginationNumber: number;
    searchType: SearchType;
}

export const MovieList: React.FC<Props> = ({ increasePageNumber, paginationNumber, searchType }) => {

    const {
        movieList,
        inspectMovie,
        loading
    } = useContext(MovieContext) as MovieContextType;
    
    let [paginatedMovieList, setPaginatedMovieList] = useState<SimpleMovieDetail[]>([]);
    let [paginationThreshhold, setPaginationThreshold] = useState<number>(searchType == SearchType.BASIC_SEARCH ? 10 : 20);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const searchThroughMoviesByPagination = (paginationNumber: number, searchType: SearchType) => {

        
        if (searchType == SearchType.BASIC_SEARCH) {

            const firstIndex = ( (paginationNumber + 1) * 3) - 3;
            const lastIndex = (paginationNumber + 1) * 3;
        // if paginationNumber * 3 equals 12 or 21 or 30, send a request with new page number 
            if ((paginationNumber + 1) * 3 > paginationThreshhold) {                
                increasePageNumber();
                setPaginationThreshold(paginationThreshhold + 10);

            }

            if (movieList.length >= 0 && loading == false) {    
                // movieList.slice(firstIndex, lastIndex);
                setPaginatedMovieList(movieList.slice((( (paginationNumber + 1) * 3) - 3), ( ((paginationNumber + 1) * 3))));
                const slicedMovieList = movieList.slice((( (paginationNumber + 1) * 3) - 3), ( ((paginationNumber + 1) * 3)));
                if (slicedMovieList.length < 3) {
                    // setPaginatedMovieList([]);
                    increasePageNumber();
                }
                // forceUpdate();
            }
        }

        if (searchType == SearchType.EXTENDED_SEARCH) {
            
            // (paginationNumber + 1) * 2 - 1
            
            increasePageNumber(paginationNumber);
            
            if (movieList.length >= 0 && loading == false) {
                setPaginatedMovieList(movieList);
            }
        }
    }

    useEffect(() => {

        searchThroughMoviesByPagination(paginationNumber, searchType);
        
    }, [paginationNumber, loading]);
    
    return (
        <div className="flex flex-wrap justify-around">
            {
                paginatedMovieList.map((movie: SimpleMovieDetail) => (
                    <MovieCard key={movie.imdbID} movieDetail={movie} inspectMovie={inspectMovie} />
                ))
            }
        </div>
    )
}
