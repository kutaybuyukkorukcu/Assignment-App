import { MovieCard, SearchBar, MovieList } from "components";
import { MovieContext, MovieContextType } from "context";
import ReactPaginate from 'react-paginate';

import React, { useContext, useEffect, useState } from "react";
import { SearchType } from "types";
import { Pagination } from "components/common";
import { MovieDetailCard } from "components/layout/main/MovieDetailCard";
import { Link } from "react-router-dom";

export const MovieContainer: React.FC = () => {

    const { 
        movieList, 
        totalMovieResults,
        searchMovie,
        searchParam,
        setSearchParam,
        searchType,
        setSearchType,
        extendedSearchMovie, 
        searchRandomMovies
    } = useContext(MovieContext) as MovieContextType;

    // const [searchParam, setSearchParam] = useState<string>('Marvel');
    const [paginationNumber, setPaginationNumber] = useState<{ selected }>({ selected: 0 });
    // const [searchType, setSearchType] = useState<SearchType>(SearchType.BASIC_SEARCH);
    const [pageNumber, setPageNumber] = useState<number>(1);
    
    useEffect(() => {
        // searchRandomMovies()
        searchMovie(searchParam, pageNumber, false);

    }, [pageNumber])

    useEffect(() => {
        const delayFunc = setTimeout(() => searchMovie(searchParam, pageNumber, true), 300);
        // setPaginationNumber({selected : 0});
        return () => clearTimeout(delayFunc);
        }, [searchParam]
    )

    const increasePageNumber = () => {
        setPageNumber(pageNumber + 1);
    }

    return (
        <>
            <SearchBar searchParam={searchParam} setSearchParam={setSearchParam} setSearchType={setSearchType} />
            <MovieList 
                paginationNumber={paginationNumber.selected} 
                searchType={searchType}
                increasePageNumber={increasePageNumber} 
            />
            <div className="self-center mt-10">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'..'}
                    pageCount={Math.ceil((totalMovieResults < 50 ? totalMovieResults : 50) / 3)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={setPaginationNumber}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    />
            </div>
        </>
    )
}
