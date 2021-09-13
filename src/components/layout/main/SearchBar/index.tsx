import { MovieContext, MovieContextType } from "context";
import React, { useContext, useEffect } from "react";
import { SearchType } from "types";

interface Props {
    setPageNumber: (pageNumber: number) => void;
}

export const SearchBar: React.FC<Props> = ({ setPageNumber }) => {

    const { 
        searchParam,
        setSearchParam,
        searchType,
        setSearchType,
    } = useContext(MovieContext) as MovieContextType;

    function onChangeSearchType(searchType: SearchType) {
        setSearchType(searchType);
        setPageNumber(1)
    }

    let active_basic_search_class = SearchType.BASIC_SEARCH == searchType ? 
        'cursor-pointer border text-center rounded bg-blue-200' : 
        'cursor-pointer border text-center rounded bg-gray-200';

    let active_extended_search_class = SearchType.EXTENDED_SEARCH == searchType ? 
        'cursor-pointer border text-center rounded bg-blue-200' : 
        'cursor-pointer border text-center rounded bg-gray-200';

    return (
        // SearchType'lar setlendigi zaman pageNumber'da resetlenmeli.
        <div className="flex justify-center my-auto bg-gray-300 shadow p-4 ml-80 mr-80">
            <input className="w-full rounded p-2" type="text" placeholder="Search movie" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
            <div className="flex-column p-3 w-40">
                <div className={active_basic_search_class} onClick={() => onChangeSearchType(SearchType.BASIC_SEARCH)}>
                        Basic Search
                </div>
                <div className="p-2"></div>
                {/* <div className="cursor-pointer border text-center rounded bg-gray-200" onClick={() => setSearchType(SearchType.EXTENDED_SEARCH)}> */}
                <div className={active_extended_search_class} onClick={() => onChangeSearchType(SearchType.EXTENDED_SEARCH)}>
                        Extended Search
                </div>
            </div>
        </div>
    )
}
