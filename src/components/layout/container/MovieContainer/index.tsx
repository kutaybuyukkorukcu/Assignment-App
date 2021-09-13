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
        totalMovieResults,
        searchMovie,
        searchParam,
        searchType,
        extendedSearchMovie, 
    } = useContext(MovieContext) as MovieContextType;

    // context'e tasinabilirler.
    const [paginationNumber, setPaginationNumber] = useState<{ selected }>({ selected: 0 });
    const [pageNumber, setPageNumber] = useState<number>(1);
    
    useEffect(() => {

        if (searchType == SearchType.BASIC_SEARCH) {
            searchMovie(searchParam, pageNumber, false);
        } else if (searchType == SearchType.EXTENDED_SEARCH) {
            extendedSearchMovie(searchParam, pageNumber, true);
        }

    }, [pageNumber, searchType])

    useEffect(() => {
        const delayFunc = searchType == SearchType.BASIC_SEARCH ?
          setTimeout(() => searchMovie(searchParam, pageNumber, true), 300) :
          setTimeout(() => extendedSearchMovie(searchParam, pageNumber, true), 300);
          
        return () => clearTimeout(delayFunc);
        }, [searchParam]
    )

    const increasePageNumber = (paginationNumber?: number) => {
        if (searchType == SearchType.BASIC_SEARCH) {
            setPageNumber(pageNumber + 1);
        } else if (searchType == SearchType.EXTENDED_SEARCH) {
            const newPageNumber = ((paginationNumber + 1) * 2) - 1;
            setPageNumber(newPageNumber);
        }
    }

    return (
        <>
            <SearchBar setPageNumber={setPageNumber} />
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
