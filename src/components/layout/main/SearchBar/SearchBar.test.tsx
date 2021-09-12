import React, { useState } from "react";
// import { SearchBar } from "components";
import { SearchBar } from ".";

import { render } from "@testing-library/react";
import { SearchType } from "types";

const [searchParam, setSearchParam] = useState<string>('Marvel');
const [searchType, setSearchType] = useState<SearchType>(SearchType.BASIC_SEARCH);

it("matches snapshot", () => {

    const { asFragment } = render(<SearchBar searchParam={searchParam} setSearchParam={setSearchParam} setSearchType={setSearchType} /> );

    expect(asFragment()).toMatchSnapshot();
})
