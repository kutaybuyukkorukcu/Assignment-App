import React, { useEffect } from "react";
import { SearchType } from "types";

interface Props {
    searchParam: string;
    setSearchParam: (searchParam: string) => void;
    setSearchType: (searchType :SearchType) => void;
}

export const SearchBar: React.FC<Props> = ({ searchParam, setSearchParam }) => {

    return (
        // <div className="flex justify-center m-auto">
        //     <input type="text" value={searchParam} placeholder="Search" onChange={(e) => setSearchParam(e.target.value)} className="rounded-md bg-gray-100 pl-4" />
        //     {/* Something to change search type */}
        // </div>

        <div className="flex justify-center my-auto bg-gray-300 shadow p-4 ml-80 mr-80">
            <input className="w-full rounded p-2" type="text" placeholder="Search movie" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
            <div className="flex-column p-3 w-40">
                <div className="">
                    Basic Search
                </div>
                <div className="">
                    Extended Search
                </div>
            </div>
        </div>
    )
}
