import React from "react";

interface Props {
    setSearchParam: (searchParam: string) => void
}

export const SearchBar: React.FC<Props> = ({ setSearchParam }) => {
    return (
        <div className="flex justify-center m-auto">
            <input type="text" placeholder="Search" onChange={(e) => setSearchParam(e.currentTarget.value)} className="rounded-md bg-gray-100 pl-4" />
        </div>
    )
}
